/**
 * Optimise les images du portfolio puis les envoie vers Supabase.
 *   - version "web"  : 1200 px de large, WebP  (cartes, panneau, vignettes)
 *   - version "full" : 2400 px de large, WebP  (plein écran)
 * Source : src/assets/<nom>.png ; met à jour project_images.path / full_path.
 * Peut être relancé sans risque : les lignes déjà converties (.webp) sont ignorées.
 *
 * Usage : npm run upload:images        (nécessite .env.local avec la clé secrète)
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
if (!url || !serviceKey) { console.error('NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis dans .env.local'); process.exit(1); }

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
const BUCKET = 'portfolio';
const ASSETS = path.resolve('src/assets');
const OPT = { cacheControl: '31536000', upsert: true, contentType: 'image/webp' };

const encode = (file, width, quality) =>
    sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer();

const { data: rows, error } = await supabase.from('project_images').select('id, path, full_path');
if (error) { console.error(error.message); process.exit(1); }

const done = new Map(); // base -> { web, full }
let ok = 0, skipped = 0, missing = 0, failed = 0;

for (const row of rows) {
    if (row.path.endsWith('.webp')) { skipped++; continue; }
    const base = path.basename(row.path, path.extname(row.path));
    if (!done.has(base)) {
        const file = path.join(ASSETS, path.basename(row.path));
        if (!existsSync(file)) { console.warn(`  ✗ introuvable : ${file}`); missing++; continue; }
        const { width } = await sharp(file).metadata();
        const web = await encode(file, 1200, 80);
        const wide = width > 1300;
        const full = wide ? await encode(file, 2400, 84) : null;
        const up = (p, buf) => supabase.storage.from(BUCKET).upload(p, buf, OPT);
        const r1 = await up(`projects/${base}.webp`, web);
        const r2 = full ? await up(`projects/${base}-full.webp`, full) : { error: null };
        if (r1.error || r2.error) { console.warn(`  ✗ ${base} : ${(r1.error || r2.error).message}`); failed++; continue; }
        done.set(base, { path: `projects/${base}.webp`, full: wide ? `projects/${base}-full.webp` : null });
        console.log(`  ✓ ${base}  web ${(web.length / 1024) | 0} Ko${full ? `, full ${(full.length / 1024) | 0} Ko` : ''}`);
        ok++;
    }
    const d = done.get(base);
    const { error: e } = await supabase.from('project_images').update({ path: d.path, full_path: d.full }).eq('id', row.id);
    if (e) { console.warn(`  ✗ ligne ${row.id} : ${e.message}`); failed++; }
}
console.log(`\nTerminé : ${ok} converties, ${skipped} déjà optimisées, ${missing} introuvables, ${failed} en erreur.`);
process.exit(failed || missing ? 1 : 0);
