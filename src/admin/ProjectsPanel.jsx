import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, Image as ImageIcon, Plus, Save, Search, Trash2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as api from './api';
import { Field } from './ui';
import { SLUG_RE, explain, slugify } from './util';

const NEW = '__new__';

const blankForm = (position) => ({
    id: '', category_id: '', title: '', tag: '', link: '', featured: false, position,
    phases: [], images: [],
});

const toForm = (p) => ({
    id: p.id, category_id: p.category_id, title: p.title, tag: p.tag ?? '', link: p.link ?? '',
    featured: p.featured, position: p.position,
    phases: p.phases.map(ph => ({
        period_id: ph.period_id, dates: ph.dates ?? '', metrics: ph.metrics ?? '',
        tech: (ph.tech ?? []).join(', '), description: ph.description ?? '',
    })),
    images: p.project_images.map(im => ({
        key: `i${im.id}`, path: im.path, full_path: im.full_path ?? '',
        description: im.description ?? '', category: im.category ?? '',
    })),
});

/* ====================== Éditeur d'un projet ====================== */
function ProjectEditor({ project, nextPosition, periods, categories, refresh, notify, onCreated, onDeleted, onDirtyChange }) {
    const isNew = !project;
    const initial = useMemo(() => (project ? toForm(project) : blankForm(nextPosition)), [project, nextPosition]);
    const [form, setForm] = useState(initial);
    const [idTouched, setIdTouched] = useState(false);
    const [busy, setBusy] = useState(false);
    const [uploading, setUploading] = useState(false);

    // après un enregistrement, repartir des données fraîches
    useEffect(() => { setForm(initial); }, [initial]);

    const dirty = JSON.stringify(form) !== JSON.stringify(initial);
    useEffect(() => { onDirtyChange(dirty); }, [dirty, onDirtyChange]);

    const set = (patch) => setForm(f => ({ ...f, ...patch }));
    const setTitle = (title) => set({ title, ...(isNew && !idTouched ? { id: slugify(title) } : {}) });

    /* ----- phases ----- */
    const usedPeriods = new Set(form.phases.map(ph => Number(ph.period_id)));
    const freePeriod = periods.find(p => !usedPeriods.has(p.id));
    const updatePhase = (i, patch) => setForm(f => ({ ...f, phases: f.phases.map((ph, k) => (k === i ? { ...ph, ...patch } : ph)) }));
    const addPhase = () => freePeriod && setForm(f => ({
        ...f, phases: [...f.phases, { period_id: freePeriod.id, dates: '', metrics: '', tech: '', description: '' }],
    }));
    const removePhase = (i) => setForm(f => ({ ...f, phases: f.phases.filter((_, k) => k !== i) }));

    /* ----- images ----- */
    const updateImage = (i, patch) => setForm(f => ({ ...f, images: f.images.map((im, k) => (k === i ? { ...im, ...patch } : im)) }));
    const moveImage = (i, d) => setForm(f => {
        const j = i + d;
        if (j < 0 || j >= f.images.length) return f;
        const images = [...f.images];
        [images[i], images[j]] = [images[j], images[i]];
        return { ...f, images };
    });
    const removeImage = (i) => {
        const im = form.images[i];
        if (im.fresh) api.removeFile(im.path).catch(() => {}); // envoyée pendant cette session, jamais enregistrée
        setForm(f => ({ ...f, images: f.images.filter((_, k) => k !== i) }));
    };
    const onFiles = async (e) => {
        const files = [...e.target.files];
        e.target.value = '';
        if (!files.length) return;
        const slug = form.id || slugify(form.title) || 'projet';
        setUploading(true);
        try {
            for (const file of files) {
                const path = await api.uploadImage(file, slug);
                setForm(f => ({ ...f, images: [...f.images, { key: `n${path}`, path, full_path: '', description: '', category: '', fresh: true }] }));
            }
        } catch (err) {
            notify({ type: 'error', text: `Envoi impossible : ${explain(err)}` });
        } finally {
            setUploading(false);
        }
    };

    /* ----- enregistrement ----- */
    const validate = () => {
        if (!form.title.trim()) return 'Le titre est obligatoire.';
        if (!form.category_id) return 'Choisis une catégorie.';
        if (!SLUG_RE.test(form.id)) return "L'identifiant doit être en minuscules, chiffres et tirets (ex. memorial-website).";
        if (form.link.trim() && !/^https?:\/\//i.test(form.link.trim())) return 'Le lien doit commencer par http:// ou https://.';
        if (form.phases.some(ph => !ph.description.trim())) return 'Chaque phase a besoin d’une description.';
        return null;
    };

    const save = async () => {
        const problem = validate();
        if (problem) return notify({ type: 'error', text: problem });
        setBusy(true);
        try {
            await api.saveProject({ form, isNew, previous: project });
            await refresh();
            notify({ type: 'ok', text: isNew ? 'Projet créé.' : 'Projet enregistré.' });
            if (isNew) onCreated(form.id);
        } catch (err) {
            if (err.partial) { await refresh(); onCreated(form.id); }
            notify({ type: 'error', text: err.partial ? `Projet créé, mais une étape a échoué : ${explain(err)} Réessaie d'enregistrer.` : explain(err) });
        } finally {
            setBusy(false);
        }
    };

    const remove = async () => {
        if (!window.confirm(`Supprimer définitivement « ${project.title} », ses phases et ses images ?`)) return;
        setBusy(true);
        try {
            await api.deleteProject(project);
            await refresh();
            notify({ type: 'ok', text: 'Projet supprimé.' });
            onDeleted();
        } catch (err) {
            notify({ type: 'error', text: explain(err) });
            setBusy(false);
        }
    };

    return (
        <section className="ad-editor">
            <div className="ad-editor-head">
                <h2>{isNew ? 'Nouveau projet' : project.title}</h2>
                <div className="ad-actions">
                    {!isNew && <Link className="ad-btn" to="/" target="_blank"><ExternalLink size={15} strokeWidth={1.6} />Voir</Link>}
                    {!isNew && <button className="ad-btn ad-btn--danger" onClick={remove} disabled={busy}><Trash2 size={15} strokeWidth={1.6} />Supprimer</button>}
                    <button className="ad-btn ad-btn--dark" onClick={save} disabled={busy || (!isNew && !dirty)}>
                        <Save size={15} strokeWidth={1.6} />{busy ? 'Enregistrement…' : 'Enregistrer'}
                    </button>
                </div>
            </div>

            <div className="ad-card">
                <h3>Informations</h3>
                <div className="ad-grid2">
                    <Field label="Titre *" className="ad-span2">
                        <input className="ad-input" value={form.title} onChange={e => setTitle(e.target.value)} />
                    </Field>
                    <Field label="Identifiant *" hint={isNew ? 'Généré depuis le titre. Impossible à changer ensuite.' : 'Non modifiable.'}>
                        <input className="ad-input" value={form.id} disabled={!isNew}
                               onChange={e => { setIdTouched(true); set({ id: e.target.value }); }} />
                    </Field>
                    <Field label="Catégorie *">
                        <select className="ad-input" value={form.category_id} onChange={e => set({ category_id: e.target.value })}>
                            <option value="">— choisir —</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </Field>
                    <Field label="Étiquette" hint="Ex. Application, Campaign…">
                        <input className="ad-input" value={form.tag} onChange={e => set({ tag: e.target.value })} />
                    </Field>
                    <Field label="Lien (appli en ligne)" hint="Affiche le statut « Live » sur la carte.">
                        <input className="ad-input" type="url" placeholder="https://…" value={form.link} onChange={e => set({ link: e.target.value })} />
                    </Field>
                    <Field label="Ordre" hint="Plus le nombre est grand, plus le projet est récent dans la liste.">
                        <input className="ad-input" type="number" value={form.position} onChange={e => set({ position: e.target.value })} />
                    </Field>
                </div>
            </div>

            <div className="ad-card">
                <div className="ad-card-head">
                    <h3>Phases <small>{form.phases.length}</small></h3>
                    <button className="ad-btn" onClick={addPhase} disabled={!freePeriod}><Plus size={15} strokeWidth={1.6} />Ajouter une phase</button>
                </div>
                {form.phases.length === 0 && (
                    <p className="ad-warn">Sans phase, ce projet n’apparaît pas sur le site : ajoute au moins une période.</p>
                )}
                {form.phases.map((ph, i) => (
                    <div className="ad-sub" key={ph.period_id}>
                        <div className="ad-sub-head">
                            <select className="ad-input ad-input--pill" value={ph.period_id}
                                    onChange={e => updatePhase(i, { period_id: Number(e.target.value) })}>
                                {periods.map(p => (
                                    <option key={p.id} value={p.id} disabled={p.id !== Number(ph.period_id) && usedPeriods.has(p.id)}>{p.title}</option>
                                ))}
                            </select>
                            <button className="ad-icon" onClick={() => removePhase(i)} title="Retirer cette phase" aria-label="Retirer cette phase"><Trash2 size={16} strokeWidth={1.6} /></button>
                        </div>
                        <Field label="Description *">
                            <textarea className="ad-input" rows={4} value={ph.description} onChange={e => updatePhase(i, { description: e.target.value })} />
                        </Field>
                        <div className="ad-grid3">
                            <Field label="Dates" hint="Ex. April – October 2025"><input className="ad-input" value={ph.dates} onChange={e => updatePhase(i, { dates: e.target.value })} /></Field>
                            <Field label="Indicateur" hint="Ex. 100+ articles translated"><input className="ad-input" value={ph.metrics} onChange={e => updatePhase(i, { metrics: e.target.value })} /></Field>
                            <Field label="Outils" hint="Séparés par des virgules"><input className="ad-input" value={ph.tech} onChange={e => updatePhase(i, { tech: e.target.value })} /></Field>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ad-card">
                <div className="ad-card-head">
                    <h3>Images <small>{form.images.length}</small></h3>
                    <label className={`ad-btn ${uploading ? 'is-disabled' : ''}`}>
                        <Upload size={15} strokeWidth={1.6} />{uploading ? 'Envoi…' : 'Ajouter des images'}
                        <input type="file" accept="image/*" multiple hidden disabled={uploading} onChange={onFiles} />
                    </label>
                </div>
                {form.images.length === 0 && <p className="ad-muted"><ImageIcon size={15} /> Aucune image. La première servira de couverture.</p>}
                <div className="ad-images">
                    {form.images.map((im, i) => (
                        <div className="ad-image" key={im.key}>
                            <div className="ad-image-pic">
                                <img src={api.publicUrl(im.path)} alt="" loading="lazy" />
                                {i === 0 && <span className="ad-cover">Couverture</span>}
                            </div>
                            <input className="ad-input" placeholder="Catégorie (facultatif)" value={im.category} onChange={e => updateImage(i, { category: e.target.value })} />
                            <textarea className="ad-input" rows={2} placeholder="Description (facultatif)" value={im.description} onChange={e => updateImage(i, { description: e.target.value })} />
                            <div className="ad-image-tools">
                                <button className="ad-icon" onClick={() => moveImage(i, -1)} disabled={i === 0} aria-label="Monter"><ArrowUp size={16} strokeWidth={1.6} /></button>
                                <button className="ad-icon" onClick={() => moveImage(i, 1)} disabled={i === form.images.length - 1} aria-label="Descendre"><ArrowDown size={16} strokeWidth={1.6} /></button>
                                <button className="ad-icon ad-icon--danger" onClick={() => removeImage(i)} aria-label="Retirer l’image"><Trash2 size={16} strokeWidth={1.6} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ====================== Liste + éditeur ====================== */
export default function ProjectsPanel({ data, refresh, notify }) {
    const { projects, categories, periods } = data;
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState('');
    const [cat, setCat] = useState('all');
    const [dirty, setDirty] = useState(false);

    const catById = useMemo(() => Object.fromEntries(categories.map(c => [c.id, c])), [categories]);
    const list = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter(p => (cat === 'all' || p.category_id === cat) && (!q || p.title.toLowerCase().includes(q)));
    }, [projects, cat, query]);
    const nextPosition = (projects.reduce((m, p) => Math.max(m, p.position), 0) || 0) + 1;
    const selected = selectedId && selectedId !== NEW ? projects.find(p => p.id === selectedId) : null;

    const go = (id) => {
        if (id === selectedId) return;
        if (dirty && !window.confirm('Abandonner les modifications non enregistrées ?')) return;
        setDirty(false);
        setSelectedId(id);
    };

    return (
        <div className="ad-body">
            <aside className="ad-list">
                <div className="ad-list-head">
                    <label className="ad-search"><Search size={16} strokeWidth={1.6} />
                        <input placeholder="Rechercher…" value={query} onChange={e => setQuery(e.target.value)} />
                    </label>
                    <button className="ad-btn ad-btn--dark" onClick={() => go(NEW)}><Plus size={15} strokeWidth={1.8} />Nouveau</button>
                </div>
                <select className="ad-input ad-input--pill" value={cat} onChange={e => setCat(e.target.value)} aria-label="Filtrer par catégorie">
                    <option value="all">Toutes les catégories ({projects.length})</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.title} ({projects.filter(p => p.category_id === c.id).length})</option>)}
                </select>
                <ul>
                    {list.map(p => (
                        <li key={p.id}>
                            <button className={`ad-row ${selectedId === p.id ? 'is-on' : ''}`} onClick={() => go(p.id)}>
                                <span className="ad-row-title">{p.title}</span>
                                <span className="ad-row-sub">
                                    {catById[p.category_id]?.short ?? p.category_id} · {p.phases.length} phase{p.phases.length > 1 ? 's' : ''} · {p.project_images.length} img
                                    {p.phases.length === 0 && <em>masqué</em>}
                                </span>
                            </button>
                        </li>
                    ))}
                    {list.length === 0 && <li className="ad-muted ad-pad">Aucun projet.</li>}
                </ul>
            </aside>

            {selectedId === null ? (
                <section className="ad-empty">Choisis un projet dans la liste, ou crée-en un nouveau.</section>
            ) : (
                <ProjectEditor key={selectedId} project={selected} nextPosition={nextPosition}
                               periods={periods} categories={categories} refresh={refresh} notify={notify}
                               onDirtyChange={setDirty}
                               onCreated={(id) => { setDirty(false); setSelectedId(id); }}
                               onDeleted={() => { setDirty(false); setSelectedId(null); }} />
            )}
        </div>
    );
}
