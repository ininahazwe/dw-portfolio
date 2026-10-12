import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const key = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// null si les variables ne sont pas définies : l'appli retombe alors sur src/data/portfolio.js
export const supabase = url && key ? createClient(url, key) : null;

export const BUCKET = 'portfolio';
export const publicUrl = (path) =>
    path ? supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl : null;
