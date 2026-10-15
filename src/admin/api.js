/**
 * Accès aux données de l'administration. Toutes les écritures passent par ici ;
 * la sécurité réelle est assurée côté base par les règles RLS (is_admin()).
 */
import { supabase, publicUrl, BUCKET } from '../lib/supabase';

const must = ({ data, error }) => { if (error) throw error; return data; };

/* ---------- Authentification ---------- */
export const auth = {
    signIn: async (email, password) => must(await supabase.auth.signInWithPassword({ email, password })),
    signOut: () => supabase.auth.signOut(),
    isAdmin: async (userId) => {
        const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', userId).maybeSingle();
        if (error) throw error;
        return !!data;
    },
};

/* ---------- Lecture ---------- */
export async function loadAll() {
    const [periods, categories, projects] = await Promise.all([
        supabase.from('periods').select('*').order('start_month'),
        supabase.from('categories').select('*').order('position'),
        supabase.from('projects').select('*, phases(*), project_images(*)').order('position', { ascending: false }),
    ]);
    return {
        periods: must(periods),
        categories: must(categories),
        projects: must(projects).map(p => ({
            ...p,
            phases: [...(p.phases ?? [])].sort((a, b) => a.period_id - b.period_id),
            project_images: [...(p.project_images ?? [])].sort((a, b) => a.position - b.position),
        })),
    };
}

/* ---------- Images ---------- */
const EXT = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/svg+xml': 'svg' };

// Réduit les grandes images (1600 px max, WebP) pour garder le site rapide.
async function shrink(file, max = 1600) {
    const keep = { blob: file, type: file.type, ext: EXT[file.type] ?? (file.name.split('.').pop() || 'png').toLowerCase() };
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') return keep;
    try {
        const bmp = await createImageBitmap(file);
        const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bmp.width * scale);
        canvas.height = Math.round(bmp.height * scale);
        canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise(r => canvas.toBlob(r, 'image/webp', 0.86));
        return blob && blob.size < file.size ? { blob, type: 'image/webp', ext: 'webp' } : keep;
    } catch {
        return keep;
    }
}

export async function uploadImage(file, slug) {
    const { blob, type, ext } = await shrink(file);
    const path = `projects/${slug}-${Date.now().toString(36)}${Math.floor(Math.random() * 99)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: type, cacheControl: '31536000', upsert: false });
    if (error) throw error;
    return path;
}

export const removeFile = async (path) => { await supabase.storage.from(BUCKET).remove([path]); };

// Supprime du stockage les fichiers qui ne sont plus référencés par aucune ligne.
async function cleanupStorage(paths) {
    try {
        const orphans = [];
        for (const p of new Set(paths.filter(Boolean))) {
            const { count, error } = await supabase.from('project_images')
                .select('id', { count: 'exact', head: true }).or(`path.eq.${p},full_path.eq.${p}`);
            // En cas de doute (erreur, comptage absent), on ne supprime rien.
            if (!error && count === 0) orphans.push(p);
        }
        if (orphans.length) await supabase.storage.from(BUCKET).remove(orphans);
    } catch (e) {
        console.warn('[admin] nettoyage du stockage ignoré', e);
    }
}

export { publicUrl };

/* ---------- Projets ---------- */
export async function saveProject({ form, isNew, previous }) {
    const row = {
        category_id: form.category_id,
        title: form.title.trim(),
        tag: form.tag.trim() || null,
        link: form.link.trim() || null,
        featured: !!form.featured,
        position: Number(form.position) || 0,
    };

    if (isNew) {
        const { data: existing } = await supabase.from('projects').select('id').eq('id', form.id).maybeSingle();
        if (existing) throw Object.assign(new Error('Cet identifiant existe déjà.'), { code: '23505' });
        must(await supabase.from('projects').insert({ id: form.id, ...row }));
    } else {
        must(await supabase.from('projects').update(row).eq('id', form.id));
    }

    try {
        // Phases : supprimer les périodes retirées, puis enregistrer les autres
        const keep = form.phases.map(ph => Number(ph.period_id));
        let del = supabase.from('phases').delete().eq('project_id', form.id);
        if (keep.length) del = del.not('period_id', 'in', `(${keep.join(',')})`);
        must(await del);
        if (form.phases.length) {
            must(await supabase.from('phases').upsert(form.phases.map(ph => ({
                project_id: form.id,
                period_id: Number(ph.period_id),
                dates: ph.dates.trim() || null,
                description: ph.description.trim(),
                metrics: ph.metrics.trim() || null,
                tech: ph.tech.split(',').map(x => x.trim()).filter(Boolean),
            })), { onConflict: 'project_id,period_id' }));
        }

        // Images : on ajoute les nouvelles lignes, puis on retire les anciennes (rien n'est perdu si l'ajout échoue)
        const oldImages = previous?.project_images ?? [];
        if (form.images.length) {
            must(await supabase.from('project_images').insert(form.images.map((im, i) => ({
                project_id: form.id,
                path: im.path,
                full_path: im.full_path || null,
                description: im.description.trim() || null,
                category: im.category.trim() || null,
                position: i,
            }))));
        }
        if (oldImages.length) must(await supabase.from('project_images').delete().in('id', oldImages.map(i => i.id)));
        await cleanupStorage(oldImages.flatMap(i => [i.path, i.full_path]));
    } catch (e) {
        if (isNew) e.partial = true; // le projet existe déjà : l'interface bascule en mode édition
        throw e;
    }
}

export async function deleteProject(project) {
    must(await supabase.from('projects').delete().eq('id', project.id));
    await cleanupStorage((project.project_images ?? []).flatMap(i => [i.path, i.full_path]));
}

/* ---------- Périodes ---------- */
export async function savePeriod(row, isNew) {
    if (isNew) must(await supabase.from('periods').insert(row));
    else { const { id, ...rest } = row; must(await supabase.from('periods').update(rest).eq('id', id)); }
}
export const deletePeriod = async (id) => must(await supabase.from('periods').delete().eq('id', id));

/* ---------- Catégories ---------- */
export async function saveCategory(row, isNew) {
    if (isNew) must(await supabase.from('categories').insert(row));
    else { const { id, ...rest } = row; must(await supabase.from('categories').update(rest).eq('id', id)); }
}
export const deleteCategory = async (id) => must(await supabase.from('categories').delete().eq('id', id));
