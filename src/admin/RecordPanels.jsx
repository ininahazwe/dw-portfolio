import { useMemo } from 'react';
import * as api from './api';
import RecordPanel from './RecordPanel';
import { ICONS } from '../data/source';
import { SLUG_RE, dateToMonth, monthToDate, parseLines } from './util';

/* ---------------------------- Périodes ---------------------------- */
export function PeriodsPanel({ data, refresh, notify }) {
    const { periods, projects } = data;
    const config = useMemo(() => ({
        noun: { one: 'Période', plural: 'Périodes' },
        items: periods,
        getId: p => p.id,
        rowOf: p => ({
            title: p.title,
            sub: `${dateToMonth(p.start_month)} → ${dateToMonth(p.end_month)} · ${projects.filter(pr => pr.phases.some(ph => ph.period_id === p.id)).length} projets`,
        }),
        blank: () => {
            const last = periods.at(-1);
            const nextId = (periods.reduce((m, p) => Math.max(m, p.id), -1)) + 1;
            return {
                id: String(nextId), title: '', subtitle: '', description: '', summary: '',
                start: last ? dateToMonth(last.end_month) : '', end: '', highlights: '',
            };
        },
        toForm: p => ({
            id: String(p.id), title: p.title, subtitle: p.subtitle ?? '', description: p.description ?? '',
            summary: p.summary ?? '', start: dateToMonth(p.start_month), end: dateToMonth(p.end_month),
            highlights: (p.highlights ?? []).join('\n'),
        }),
        fields: [
            { name: 'title', label: 'Titre *', wide: true },
            { name: 'subtitle', label: 'Sous-titre' },
            { name: 'id', label: 'Numéro', type: 'number', readOnlyOnEdit: true, hint: 'Ordre de création : 0, 1, 2…' },
            { name: 'start', label: 'Début *', type: 'month' },
            { name: 'end', label: 'Fin *', type: 'month', hint: 'Mois de fin affiché dans la frise.' },
            { name: 'summary', label: 'Résumé (affiché dans le panneau)', type: 'textarea', rows: 5, wide: true },
            { name: 'description', label: 'Description courte', type: 'textarea', wide: true },
            { name: 'highlights', label: 'Points clés', type: 'lines', hint: 'Un par ligne.', wide: true },
        ],
        validate: (f, isNew) => {
            if (!f.title.trim()) return 'Le titre est obligatoire.';
            if (!/^\d+$/.test(String(f.id))) return 'Le numéro doit être un entier.';
            if (isNew && periods.some(p => p.id === Number(f.id))) return 'Ce numéro est déjà utilisé.';
            if (!f.start || !f.end) return 'Indique le début et la fin.';
            if (f.end <= f.start) return 'La fin doit être après le début.';
            return null;
        },
        save: (f, isNew) => api.savePeriod({
            id: Number(f.id), title: f.title.trim(), subtitle: f.subtitle.trim() || null,
            description: f.description.trim() || null, summary: f.summary.trim() || null,
            start_month: monthToDate(f.start), end_month: monthToDate(f.end), highlights: parseLines(f.highlights),
        }, isNew),
        remove: p => api.deletePeriod(p.id),
    }), [periods, projects]);
    return <RecordPanel config={config} refresh={refresh} notify={notify} />;
}

/* --------------------------- Catégories --------------------------- */
export function CategoriesPanel({ data, refresh, notify }) {
    const { categories, projects } = data;
    const config = useMemo(() => ({
        noun: { one: 'Catégorie', plural: 'Catégories' },
        items: categories,
        getId: c => c.id,
        rowOf: c => ({ title: c.title, sub: `${c.short} · ${projects.filter(p => p.category_id === c.id).length} projets` }),
        blank: () => ({ id: '', title: '', short: '', icon: 'Folder', color: '', position: String((categories.reduce((m, c) => Math.max(m, c.position), -1)) + 1) }),
        toForm: c => ({ id: c.id, title: c.title, short: c.short, icon: c.icon ?? 'Folder', color: c.color ?? '', position: String(c.position) }),
        fields: [
            { name: 'title', label: 'Titre *', wide: true },
            { name: 'short', label: 'Nom court *', hint: 'Affiché sur les cartes et les filtres.' },
            { name: 'id', label: 'Identifiant *', readOnlyOnEdit: true, hint: 'Minuscules et tirets. Non modifiable ensuite.' },
            { name: 'icon', label: 'Icône', type: 'select', options: Object.keys(ICONS).map(k => ({ value: k, label: k })) },
            { name: 'color', label: 'Couleur', hint: 'Facultatif, ex. #2C2C2C.' },
            { name: 'position', label: 'Ordre', type: 'number', hint: 'Position dans les filtres (0 = premier).' },
        ],
        validate: (f, isNew) => {
            if (!f.title.trim() || !f.short.trim()) return 'Le titre et le nom court sont obligatoires.';
            if (!SLUG_RE.test(f.id)) return "L'identifiant doit être en minuscules, chiffres et tirets.";
            if (isNew && categories.some(c => c.id === f.id)) return 'Cet identifiant existe déjà.';
            return null;
        },
        save: (f, isNew) => api.saveCategory({
            id: f.id, title: f.title.trim(), short: f.short.trim(), icon: f.icon,
            color: f.color.trim() || null, position: Number(f.position) || 0,
        }, isNew),
        remove: c => api.deleteCategory(c.id),
    }), [categories, projects]);
    return <RecordPanel config={config} refresh={refresh} notify={notify} />;
}

