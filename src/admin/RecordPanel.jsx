import { useEffect, useMemo, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Field } from './ui';
import { explain } from './util';

const NEW = '__new__';

/**
 * Écran générique "liste + formulaire" pour les périodes et les catégories.
 *
 * config :
 *   noun, items, getId(item), rowOf(item) -> { title, sub }, blank() -> form
 *   toForm(item) -> form, fields: [{ name, label, type, hint, options, readOnlyOnEdit, className }]
 *   validate(form, isNew) -> message | null, save(form, isNew), remove(item)
 */
export default function RecordPanel({ config, refresh, notify }) {
    const { noun, items, getId, rowOf, fields, toForm, blank, validate, save, remove } = config;
    const [selectedId, setSelectedId] = useState(null);
    const [dirty, setDirty] = useState(false);

    const selected = selectedId && selectedId !== NEW ? items.find(i => String(getId(i)) === selectedId) : null;

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
                    <strong className="ad-list-title">{noun.plural}</strong>
                    <button className="ad-btn ad-btn--dark" onClick={() => go(NEW)}><Plus size={15} strokeWidth={1.8} />Nouvelle</button>
                </div>
                <ul>
                    {items.map(it => {
                        const id = String(getId(it)); const r = rowOf(it);
                        return (
                            <li key={id}>
                                <button className={`ad-row ${selectedId === id ? 'is-on' : ''}`} onClick={() => go(id)}>
                                    <span className="ad-row-title">{r.title}</span>
                                    <span className="ad-row-sub">{r.sub}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            {selectedId === null ? (
                <section className="ad-empty">Choisis un élément dans la liste, ou crée-en un nouveau.</section>
            ) : (
                <RecordEditor key={selectedId} item={selected} noun={noun} fields={fields}
                              initial={selected ? toForm(selected) : blank()}
                              validate={validate} save={save} remove={remove}
                              refresh={refresh} notify={notify} onDirtyChange={setDirty}
                              onCreated={(id) => { setDirty(false); setSelectedId(String(id)); }}
                              onDeleted={() => { setDirty(false); setSelectedId(null); }} />
            )}
        </div>
    );
}

function RecordEditor({ item, noun, fields, initial: initialProp, validate, save, remove, refresh, notify, onDirtyChange, onCreated, onDeleted }) {
    const isNew = !item;
    const initial = useMemo(() => initialProp, [JSON.stringify(initialProp)]); // eslint-disable-line react-hooks/exhaustive-deps
    const [form, setForm] = useState(initial);
    const [busy, setBusy] = useState(false);

    useEffect(() => { setForm(initial); }, [initial]);
    const dirty = JSON.stringify(form) !== JSON.stringify(initial);
    useEffect(() => { onDirtyChange(dirty); }, [dirty, onDirtyChange]);

    const submit = async () => {
        const problem = validate(form, isNew);
        if (problem) return notify({ type: 'error', text: problem });
        setBusy(true);
        try {
            await save(form, isNew);
            await refresh();
            notify({ type: 'ok', text: isNew ? `${noun.one} créée.` : `${noun.one} enregistrée.` });
            if (isNew) onCreated(form.id);
        } catch (err) {
            notify({ type: 'error', text: explain(err) });
        } finally {
            setBusy(false);
        }
    };

    const del = async () => {
        if (!window.confirm(`Supprimer définitivement cette ${noun.one.toLowerCase()} ?`)) return;
        setBusy(true);
        try {
            await remove(item);
            await refresh();
            notify({ type: 'ok', text: `${noun.one} supprimée.` });
            onDeleted();
        } catch (err) {
            notify({ type: 'error', text: explain(err) });
            setBusy(false);
        }
    };

    return (
        <section className="ad-editor">
            <div className="ad-editor-head">
                <h2>{isNew ? `Nouvelle ${noun.one.toLowerCase()}` : (form.title || noun.one)}</h2>
                <div className="ad-actions">
                    {!isNew && <button className="ad-btn ad-btn--danger" onClick={del} disabled={busy}><Trash2 size={15} strokeWidth={1.6} />Supprimer</button>}
                    <button className="ad-btn ad-btn--dark" onClick={submit} disabled={busy || (!isNew && !dirty)}>
                        <Save size={15} strokeWidth={1.6} />{busy ? 'Enregistrement…' : 'Enregistrer'}
                    </button>
                </div>
            </div>
            <div className="ad-card">
                <div className="ad-grid2">
                    {fields.map(f => (
                        <Field key={f.name} label={f.label} hint={f.hint} className={f.wide ? 'ad-span2' : ''}>
                            {f.type === 'textarea' || f.type === 'lines' ? (
                                <textarea className="ad-input" rows={f.rows ?? 4} value={form[f.name]}
                                          onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                            ) : f.type === 'select' ? (
                                <select className="ad-input" value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>
                                    {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            ) : (
                                <input className="ad-input" type={f.type ?? 'text'} value={form[f.name]}
                                       disabled={f.readOnlyOnEdit && !isNew}
                                       onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                            )}
                        </Field>
                    ))}
                </div>
            </div>
        </section>
    );
}
