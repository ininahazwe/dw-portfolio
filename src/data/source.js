/**
 * Chargement des données : Supabase si configuré, sinon le fichier local portfolio.js.
 * Les deux sources sont converties dans la même forme "raw" attendue par buildModel().
 */
import { Code, Palette, Languages, BarChart3, Folder } from 'lucide-react';
import { supabase, publicUrl } from '../lib/supabase';
import { monthIndexFr, monthIndexIso } from './derive';

export const ICONS = { Code, Palette, Languages, BarChart3, Folder };

// ---- Fichier local (secours / développement hors ligne) ----
async function fromFile() {
    const { periods, categories, projects } = await import('./portfolio');
    return {
        source: 'file',
        periods: periods.map(p => ({ ...p, start: monthIndexFr(p.startDate), end: monthIndexFr(p.endDate) })),
        categories,
        projects: projects.map((p, order) => ({ ...p, order })),
    };
}

// ---- Supabase ----
async function fromSupabase() {
    const [periods, categories, projects] = await Promise.all([
        supabase.from('periods').select('*').order('start_month'),
        supabase.from('categories').select('*').order('position'),
        supabase.from('projects').select('*, phases(*), project_images(*)').order('position'),
    ]);
    const err = periods.error || categories.error || projects.error;
    if (err) throw err;

    return {
        source: 'supabase',
        periods: periods.data.map(p => ({
            id: p.id, title: p.title, subtitle: p.subtitle, description: p.description, summary: p.summary,
            highlights: p.highlights ?? [],
            start: monthIndexIso(p.start_month), end: monthIndexIso(p.end_month),
        })),
        categories: categories.data.map(c => ({ ...c, icon: ICONS[c.icon] ?? Folder })),
        projects: projects.data.map(p => ({
            id: p.id, category: p.category_id, title: p.title, tag: p.tag, link: p.link,
            featured: p.featured, order: p.position,
            images: [...(p.project_images ?? [])]
                .sort((a, b) => a.position - b.position)
                .map(im => ({
                    src: publicUrl(im.path), full: publicUrl(im.full_path) ?? undefined,
                    description: im.description, category: im.category,
                })),
            phases: (p.phases ?? []).map(ph => ({
                periodId: ph.period_id, dates: ph.dates, description: ph.description,
                metrics: ph.metrics, tech: ph.tech ?? [],
            })),
        })),
    };
}

export async function loadRaw() {
    if (!supabase) return fromFile();
    try {
        return await fromSupabase();
    } catch (e) {
        console.warn('[portfolio] Supabase indisponible, utilisation du fichier local.', e);
        return fromFile();
    }
}
