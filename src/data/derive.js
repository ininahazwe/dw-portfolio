/**
 * Modèle de données de l'accueil "Workspace".
 *
 * buildModel(raw) transforme les données brutes (Supabase ou fichier de secours)
 * en un modèle prêt à afficher. Les composants le lisent via useModel() (DataProvider).
 *
 * Forme attendue de raw :
 *   periods     [{ id, title, subtitle, description, summary, highlights, start, end }]  start/end = index de mois
 *   categories  [{ id, title, short, icon (composant), color }]
 *   projects    [{ id, category, title, tag, link, featured, images: [{ src, full?, description?, category? }],
 *                  phases: [{ periodId, dates, description, tech, metrics }] }]
 */

export const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MONTHS_FR = {
    janvier: 0, fevrier: 1, février: 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6,
    aout: 7, août: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11, décembre: 11,
};
// "Avril 2025" -> index absolu de mois (année * 12 + mois)
export const monthIndexFr = (str = '') => {
    const [m, y] = str.trim().toLowerCase().split(/\s+/);
    return MONTHS_FR[m] === undefined ? null : Number(y) * 12 + MONTHS_FR[m];
};
// "2025-04-01" -> index absolu de mois
export const monthIndexIso = (iso = '') => {
    const [y, m] = iso.split('-').map(Number);
    return y && m ? y * 12 + (m - 1) : null;
};

const shortLabel = (a, b) => {
    const yy = (i) => String(Math.floor(i / 12)).slice(2);
    return yy(a) === yy(b)
        ? `${MONTHS_EN[a % 12]} – ${MONTHS_EN[b % 12]} ${yy(b)}`
        : `${MONTHS_EN[a % 12]} ${yy(a)} – ${MONTHS_EN[b % 12]} ${yy(b)}`;
};

// Chronologie : dernière période d'activité, puis projets les plus récemment lancés,
// puis ordre inverse (un projet ajouté plus tard est plus récent).
export const byRecency = (a, b) =>
    (b.lastPeriod - a.lastPeriod) || (b.firstPeriod - a.firstPeriod) || (b.order - a.order);

// Phase à afficher pour un projet selon la période sélectionnée
export const phaseFor = (project, periodId) =>
    project.phases.find(ph => ph.periodId === periodId) ?? project.phases.at(-1);

// "100+ articles translated" -> { value: '100+', label: 'articles translated' }
export const splitMetric = (metrics = '') => {
    const m = (metrics ?? '').match(/^(\d+\+?)\s+(.*)$/);
    return m ? { value: m[1], label: m[2] } : null;
};

export function buildModel(raw) {
    const PERIODS = [...raw.periods]
        .sort((a, b) => a.start - b.start)
        .map(p => ({ ...p, short: shortLabel(p.start, p.end) }));
    const periodById = Object.fromEntries(PERIODS.map(p => [p.id, p]));
    const periodRank = Object.fromEntries(PERIODS.map((p, i) => [p.id, i]));

    const CATEGORIES = raw.categories;
    const categoryById = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

    const PROJECTS = raw.projects
        .filter(p => p.phases?.length) // un projet sans phase n'a pas encore de place dans la frise
        .map((p, order) => {
            const phases = [...p.phases].sort((a, b) => periodRank[a.periodId] - periodRank[b.periodId]);
            return {
                ...p,
                order: p.order ?? order,
                images: p.images ?? [],
                phases,
                firstPeriod: phases[0].periodId,
                lastPeriod: phases.at(-1).periodId,
                category: categoryById[p.category] ?? { id: p.category, title: p.category, short: p.category },
            };
        });

    const projectsOfPeriod = (periodId) =>
        periodId == null ? PROJECTS : PROJECTS.filter(p => p.phases.some(ph => ph.periodId === periodId));

    const now = new Date();
    const nowIdx = now.getFullYear() * 12 + now.getMonth();
    const CURRENT_PERIOD = PERIODS.find(p => nowIdx >= p.start && nowIdx < p.end) ?? PERIODS.at(-1);
    const LATEST_WITH_CONTENT = [...PERIODS].reverse().find(p => projectsOfPeriod(p.id).length > 0) ?? PERIODS.at(-1);

    const statusOf = (project, periodId) => {
        if (project.phases.length > 1 && project.firstPeriod !== periodId) return 'Continued';
        if (project.link) return 'Live';
        if (project.firstPeriod === periodId && periodId === LATEST_WITH_CONTENT?.id) return 'New';
        return 'Delivered';
    };

    return {
        PERIODS, periodById, CATEGORIES, categoryById, PROJECTS,
        projectsOfPeriod, statusOf, CURRENT_PERIOD, LATEST_WITH_CONTENT,
    };
}
