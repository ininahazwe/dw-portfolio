// Petits utilitaires partagés par les écrans d'administration.

export const slugify = (s = '') => s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// <input type="month"> "2026-10"  <->  date SQL "2026-10-01"
export const monthToDate = (m) => (m ? `${m}-01` : null);
export const dateToMonth = (d) => (d ? d.slice(0, 7) : '');

export const parseList = (s = '') => s.split(',').map(x => x.trim()).filter(Boolean);
export const parseLines = (s = '') => s.split('\n').map(x => x.trim()).filter(Boolean);

// Traduit une erreur Supabase/Postgres en message compréhensible.
export function explain(e) {
    const code = e?.code ?? '';
    const msg = e?.message ?? String(e);
    if (code === '23503') return "Impossible : cet élément est encore utilisé ailleurs (projets, phases…). Détache-le d'abord.";
    if (code === '23505') return 'Cet identifiant existe déjà.';
    if (code === '23514') return 'Valeur refusée par la base (ex. la fin doit être après le début).';
    if (code === '42501' || /row-level security/i.test(msg)) return "Droits insuffisants : ce compte n'est pas administrateur.";
    if (/Invalid login credentials/i.test(msg)) return 'Email ou mot de passe incorrect.';
    if (/Failed to fetch|NetworkError/i.test(msg)) return 'Connexion à Supabase impossible. Vérifie ta connexion.';
    return msg;
}
