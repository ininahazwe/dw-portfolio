/**
 * Envoie les images de src/assets vers le bucket Supabase "portfolio".
 * Lit la table project_images (remplie par 002_seed.sql) et envoie chaque fichier référencé.
 *
 * Usage (depuis la racine du projet, sur ton Mac) :
 *   npm run upload:images
 *
 * Nécessite dans .env.local :
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...   (clé secrète : jamais dans le code ni dans Git)
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
if (!url || !serviceKey) {
    console.error('NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env.local');
    process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
const BUCKET = 'portfolio';
const ASSETS = path.resolve('src/assets');

const { data: rows, error } = await supabase.from('project_images').select('path, full_path');
if (error) { console.error('Lecture de project_images impossible :', error.message); process.exit(1); }

const paths = [...new Set(rows.flatMap(r => [r.path, r.full_path]).filter(Boolean))];
console.log(`${paths.length} images à envoyer…`);

let ok = 0, missing = 0, failed = 0;
for (const p of paths) {
    const file = path.join(ASSETS, path.basename(p));
    if (!existsSync(file)) { console.warn(`  ✗ introuvable : ${file}`); missing++; continue; }
    const { error: upErr } = await supabase.storage.from(BUCKET)
        .upload(p, await readFile(file), { upsert: true, contentType: 'image/png', cacheControl: '31536000' });
    if (upErr) { console.warn(`  ✗ ${p} : ${upErr.message}`); failed++; }
    else { console.log(`  ✓ ${p}`); ok++; }
}
console.log(`\nTerminé : ${ok} envoyées, ${missing} introuvables, ${failed} en erreur.`);
process.exit(failed ? 1 : 0);
