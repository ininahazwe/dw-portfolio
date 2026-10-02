import { Fragment, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { periods, categories as CATEGORIES, projects as PROJECTS } from '../data/portfolio';
import Lightbox from '../components/Lightbox';
import placeholder from '../assets/placeholder-project.svg';
import '../styles/Home.css';

const ALL = 'all';

// Périodes de la plus récente à la plus ancienne
const periodsRecentFirst = [...periods].reverse();

/* ---------- données (src/data/portfolio.js : source unique) ---------- */
const CAT_COLOR = {
    dev: 'var(--c-dev)', visual: 'var(--c-visual)',
    translation: 'var(--c-translation)', analytics: 'var(--c-analytics)',
};
const catMeta = (name) => {
    const c = CATEGORIES.find(x => x.title === name);
    return c
        ? { short: c.short, color: CAT_COLOR[c.id] ?? 'var(--c-default)' }
        : { short: name.split(' ')[0], color: 'var(--c-default)' };
};

const periodById = Object.fromEntries(periods.map(p => [p.id, p]));

// Un projet = une carte, avec une ou plusieurs phases (une par période où il a avancé).
const ENTITIES = PROJECTS
    .map(p => ({
        key: p.id,
        catName: CATEGORIES.find(c => c.id === p.category)?.title ?? p.category,
        title: p.title,
        tag: p.tag,
        link: p.link,
        images: (p.images ?? []).map(im => ({
            src: im.src,
            full: im.full ?? im.src,
            title: p.title,
            description: im.description ?? p.phases[0].description,
            link: p.link,
        })),
        phases: [...p.phases].sort((x, y) => x.periodId - y.periodId),
    }))
    // les plus récents d'abord (tri stable)
    .sort((x, y) => y.phases.at(-1).periodId - x.phases.at(-1).periodId);

// "100+ articles traduits" -> { value: '100+', label: 'articles traduits' }
const splitMetric = (metrics = '') => {
    const m = metrics.match(/^(\d+\+?)\s+(.*)$/);
    return m ? { value: m[1], label: m[2] } : null;
};

const MONTHS_FR = {
    janvier: 0, fevrier: 1, février: 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6,
    aout: 7, août: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11, décembre: 11,
};
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// "Avril 2025" -> index absolu de mois
const monthIndex = (str = '') => {
    const [m, y] = str.trim().toLowerCase().split(/\s+/);
    return MONTHS_FR[m] === undefined ? null : Number(y) * 12 + MONTHS_FR[m];
};

// période -> libellé compact : "Apr–Oct 25" (même année) ou "Oct 25–Apr 26"
const periodShort = (p) => {
    const a = monthIndex(p.startDate), b = monthIndex(p.endDate);
    if (a === null || b === null) return p.title;
    const yy = (i) => String(Math.floor(i / 12)).slice(2);
    return yy(a) === yy(b)
        ? `${MONTHS_EN[a % 12]}–${MONTHS_EN[b % 12]} ${yy(b)}`
        : `${MONTHS_EN[a % 12]} ${yy(a)}–${MONTHS_EN[b % 12]} ${yy(b)}`;
};

/* ---------- petits composants ---------- */
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
);

function Ring({ count, total, color, label }) {
    const r = 34, c = 2 * Math.PI * r;
    const pct = total ? count / total : 0;
    return (
        <div className="gauge">
            <div className="gauge-svg">
                <svg viewBox="0 0 84 84">
                    <circle cx="42" cy="42" r="40" fill="none" stroke="#D9D9D9" strokeWidth="5" strokeDasharray="1 3.2" />
                    <circle cx="42" cy="42" r={r} fill="none" stroke="#EDEDED" strokeWidth="3" />
                    <circle cx="42" cy="42" r={r} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
                            strokeDasharray={`${pct * c} ${c}`} />
                </svg>
                <div className="gauge-num">{count}</div>
            </div>
            <div className="gauge-label">{label}</div>
        </div>
    );
}

function Ruler({ range }) {
    const bounds = useMemo(() => {
        const idx = periods.flatMap(p => [monthIndex(p.startDate), monthIndex(p.endDate)]).filter(v => v !== null);
        return { min: Math.min(...idx), max: Math.max(...idx) };
    }, []);
    const months = [];
    for (let i = bounds.min; i <= bounds.max; i++) months.push(i);
    const lo = range ? range[0] : bounds.min;
    const hi = range ? range[1] : bounds.max;
    const n = months.length;
    return (
        <div className="ruler">
            <div className="ruler-row">
                {months.map(i => (
                    <div key={i} className={`ruler-cell ${i >= lo && i <= hi ? 'in' : ''}`}>
                        <small>{i % 12 === 0 || i === bounds.min ? Math.floor(i / 12) : ''}</small>
                        <span>{MONTHS_EN[i % 12]}</span>
                        <i />
                    </div>
                ))}
            </div>
            <div className="ruler-bar" style={{
                marginLeft: `${((lo - bounds.min + 0.5) / n) * 100}%`,
                width: `${((hi - lo) / n) * 100}%`,
            }} />
        </div>
    );
}

/* ---------- page ---------- */
function Home() {
    const [selected, setSelected] = useState(ALL);
    const [category, setCategory] = useState(ALL);
    const [query, setQuery] = useState('');
    const [lightbox, setLightbox] = useState(null); // { images, index }
    const [phaseSel, setPhaseSel] = useState({}); // phase affichée par carte (clic sur une étape)

    const selectPeriod = (id) => { setSelected(id); setPhaseSel({}); };

    const activePeriod = periodsRecentFirst.find(p => p.id === selected);
    const visiblePeriods = activePeriod ? [activePeriod] : periodsRecentFirst;

    // projets de la sélection (un projet multi-phases n'apparaît qu'une fois)
    const periodCards = ENTITIES.filter(e => !activePeriod || e.phases.some(ph => ph.periodId === activePeriod.id));

    // catégories disponibles (celles de la prod) + compteurs
    const categories = CATEGORIES.map(c => c.title);
    const countByCat = (name) => periodCards.filter(c => c.catName === name).length;

    // filtres : catégorie + recherche (dans toutes les phases)
    const q = query.trim().toLowerCase();
    const projects = periodCards.filter(c =>
        (category === ALL || c.catName === category) &&
        (!q || [c.title, c.tag, ...c.phases.flatMap(ph => [ph.description, ph.dates, ph.metrics, ...(ph.tech ?? [])])]
            .join(' ').toLowerCase().includes(q))
    );

    // phase affichée : choix manuel > période sélectionnée > la plus récente
    const currentPhase = (e) => {
        const wanted = phaseSel[e.key] ?? (activePeriod ? activePeriod.id : e.phases.at(-1).periodId);
        return e.phases.find(ph => ph.periodId === wanted) ?? e.phases.at(-1);
    };

    const range = activePeriod
        ? [monthIndex(activePeriod.startDate), monthIndex(activePeriod.endDate)]
        : null;

    return (
        <div className="home-layout">
            <div className="home-frame">
                {/* ===== Explorateur (1/4) ===== */}
                <aside className="home-explorer">
                    <div className="brand"><span className="brand-mark" />My journey</div>
                    <div className="panel-sep" />

                    <div className="kpi">
                        <div className="kpi-value">{projects.length}</div>
                        <span className="chip"><i />{activePeriod ? 'Period' : 'All'}</span>
                    </div>
                    <div className="kpi-caption">projects shown</div>

                    <div className="panel-sep" />
                    <p className="section-label">Timeline</p>
                    <ol className="explorer-timeline">
                        <li className={`explorer-period ${selected === ALL ? 'active' : ''}`}>
                            <button onClick={() => selectPeriod(ALL)}>
                                <div className="explorer-period-title">All</div>
                                <div className="explorer-period-sub">All periods</div>
                            </button>
                        </li>
                        {periodsRecentFirst.map(p => (
                            <li key={p.id} className={`explorer-period ${selected === p.id ? 'active' : ''}`}>
                                <button onClick={() => selectPeriod(p.id)}>
                                    <div className="explorer-period-title">{p.title}</div>
                                    <div className="explorer-period-sub">{p.subtitle}</div>
                                </button>
                                {selected === p.id && (
                                    <p className="explorer-period-summary">{p.summary ?? p.description}</p>
                                )}
                            </li>
                        ))}
                    </ol>

                    <div className="panel-sep" />
                    <p className="section-label">Breakdown</p>
                    <div className="gauges">
                        {categories.map(name => (
                            <Ring key={name} count={countByCat(name)} total={periodCards.length}
                                  color={catMeta(name).color} label={catMeta(name).short} />
                        ))}
                    </div>
                </aside>

                {/* ===== Grille (3/4) ===== */}
                <main className="home-main">
                    <div className="topbar">
                        <label className="search">
                            <SearchIcon />
                            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, tools…" />
                        </label>
                        <div className="topbar-right">{activePeriod ? activePeriod.title : 'All periods'}</div>
                    </div>

                    <div className="controls">
                        <div className="segmented">
                            <button className={category === ALL ? 'on' : ''} onClick={() => setCategory(ALL)}>All</button>
                            {categories.map(name => (
                                <button key={name} className={category === name ? 'on' : ''} onClick={() => setCategory(name)}>
                                    {catMeta(name).short}
                                </button>
                            ))}
                        </div>
                        <Ruler range={range} />
                    </div>

                    {projects.length === 0 ? (
                        <div className="empty">No project matches this filter.</div>
                    ) : (
                        <div className="projects-grid">
                            {projects.map(card => {
                                const phase = currentPhase(card);
                                const metric = splitMetric(phase.metrics);
                                const meta = catMeta(card.catName);
                                const cover = card.images[0];
                                const multi = card.phases.length > 1;
                                return (
                                    <article key={card.key} className={`grid-card ${multi ? 'grid-card--multi' : ''}`}>
                                        {cover ? (
                                            <button className="card-cover" aria-label={`Open ${card.title}`}
                                                    onClick={() => setLightbox({ images: card.images, index: 0 })}>
                                                <img src={cover.src} alt={card.title} loading="lazy" decoding="async" />
                                                {card.images.length > 1 && <span className="cover-count">{card.images.length} visuals</span>}
                                            </button>
                                        ) : (
                                            <div className="card-cover card-cover--empty">
                                                <img src={placeholder} alt="" loading="lazy" decoding="async" />
                                            </div>
                                        )}
                                        <div className="grid-card-top">
                                            <span className="chip"><i style={{ background: meta.color }} />{meta.short}</span>
                                            {(phase.dates || card.tag) && <span className="period">{phase.dates ?? card.tag}</span>}
                                        </div>
                                        <h3>{card.title}</h3>
                                        {multi && (
                                            <div className="journey" role="group" aria-label={`${card.title}: ${card.phases.length} phases`}>
                                                <span className="journey-label">{card.phases.length} phases</span>
                                                {card.phases.map((ph, i) => (
                                                    <Fragment key={ph.periodId}>
                                                        {i > 0 && <span className="journey-arrow" aria-hidden="true">→</span>}
                                                        <button
                                                            className={`pip ${ph.periodId === phase.periodId ? 'on' : ''}`}
                                                            title={periodById[ph.periodId]?.subtitle}
                                                            onClick={() => setPhaseSel(prev => ({ ...prev, [card.key]: ph.periodId }))}
                                                        >
                                                            {periodShort(periodById[ph.periodId])}
                                                        </button>
                                                    </Fragment>
                                                ))}
                                            </div>
                                        )}
                                        <p>{phase.description}</p>
                                        <div className="grid-card-foot">
                                            {metric && (
                                                <div className="metric"><b>{metric.value}</b><span>{metric.label}</span></div>
                                            )}
                                            {!metric && phase.metrics && <div className="metric-text">{phase.metrics}</div>}
                                            {phase.tech?.length > 0 && (
                                                <div className="tags">
                                                    {phase.tech.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                                                </div>
                                            )}
                                            {card.link && (
                                                <a className="card-link" href={card.link} target="_blank" rel="noopener noreferrer">Explore →</a>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>

            <AnimatePresence>
                {lightbox && (
                    <Lightbox key="lightbox" images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Home;
