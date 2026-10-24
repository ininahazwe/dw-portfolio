import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, CalendarRange, FileText, LayoutGrid, Layers, Search, SlidersHorizontal, X,
} from 'lucide-react';
import { byRecency, phaseFor } from '../data/derive';
import { useData, useModel } from '../data/DataProvider';
import ScheduleBar from '../components/workspace/ScheduleBar';
import { ProjectCard } from '../components/workspace/Cards';
import SummaryPanel from '../components/workspace/SummaryPanel';
import Lightbox from '../components/Lightbox';
import '../styles/workspace.css';

const ALL = 'all';

function Kpi({ value, label, delta }) {
    return (
        <div className="ws-kpi">
            <span className="ws-kpi-value">{value}</span>
            <span className="ws-kpi-label">{label}</span>
            {delta != null && delta !== 0 && (
                <span className={`ws-delta ${delta > 0 ? 'is-up' : 'is-down'}`}>{delta > 0 ? '↑' : '↓'}{Math.abs(delta)}</span>
            )}
        </div>
    );
}

// Cellule de grille : glisse en douceur quand la grille se réorganise (panneau ouvert / fermé)
function Cell({ children }) {
    return (
        <Motion.div layout="position" className="ws-cell" transition={{ type: 'spring', stiffness: 420, damping: 40 }}>
            {children}
        </Motion.div>
    );
}

// Indicateurs cumulés jusqu'à la période choisie ; le badge = apport de cette période.
function periodStats(periodId, { PROJECTS, projectsOfPeriod }) {
    const upTo = periodId == null ? PROJECTS : PROJECTS.filter(p => p.firstPeriod <= periodId);
    const startedHere = periodId == null ? [] : upTo.filter(p => p.firstPeriod === periodId);
    return {
        total: upTo.length,
        totalDelta: startedHere.length,
        apps: upTo.filter(p => p.link).length,
        appsDelta: startedHere.filter(p => p.link).length,
        continued: periodId == null
            ? PROJECTS.filter(p => p.phases.length > 1).length
            : projectsOfPeriod(periodId).filter(p => p.firstPeriod < periodId).length,
    };
}

// Écran de chargement aux couleurs de la page
function Loading() {
    return (
        <div className="ws ws-loading" aria-busy="true">
            <div className="ws-skel ws-skel--bar" />
            <div className="ws-skel-grid">{Array.from({ length: 8 }, (_, i) => <div key={i} className="ws-skel ws-skel--card" />)}</div>
        </div>
    );
}

export default function Workspace() {
    const { status } = useData();
    return status === 'ready' ? <WorkspaceView /> : <Loading />;
}

function WorkspaceView() {
    const model = useModel();
    const { CATEGORIES, CURRENT_PERIOD, LATEST_WITH_CONTENT, PERIODS, PROJECTS, projectsOfPeriod } = model;
    const navigate = useNavigate();
    const { hash } = useLocation();
    const match = useMatch('/project/:id');
    const contentRef = useRef(null);
    const didMount = useRef(false);
    const [category, setCategory] = useState(ALL);
    const [query, setQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [sortAZ, setSortAZ] = useState(false);
    const [periodOpen, setPeriodOpen] = useState(false); // résumé de période ouvert dans le panneau
    const [lightbox, setLightbox] = useState(null);

    // Filtre de la frise = ancre de l'URL (#oct25-apr26) : le lien partagé affiche les mêmes données
    const period = PERIODS.find(p => p.slug === hash.slice(1)) ?? null;
    const periodId = period?.id ?? null;
    const inPeriod = useMemo(() => projectsOfPeriod(periodId), [projectsOfPeriod, periodId]);

    const q = query.trim().toLowerCase();
    const list = inPeriod
        .filter(p => category === ALL || p.category.id === category)
        .filter(p => !q || [p.title, p.tag, p.category.title, ...p.phases.flatMap(ph => [ph.description, ph.metrics, ...(ph.tech ?? [])])]
            .join(' ').toLowerCase().includes(q))
        .sort(sortAZ ? (a, b) => a.title.localeCompare(b.title) : byRecency);

    const stats = periodStats(periodId, model);

    // Le projet ouvert vient de l'URL (/project/<id>) : lien partageable, bouton retour du navigateur géré.
    const urlProject = match ? PROJECTS.find(p => p.id === match.params.id) : null;
    const view = urlProject ? { type: 'project', project: urlProject } : periodOpen ? { type: 'period' } : null;
    const selectedId = urlProject?.id ?? null;

    // Lien vers un projet inconnu (supprimé, faute de frappe) : retour à l'accueil
    useEffect(() => { if (match && !urlProject) navigate('/', { replace: true }); }, [match, urlProject, navigate]);

    const closePanel = () => { setPeriodOpen(false); if (match) navigate({ pathname: '/', hash }); };
    const showPeriod = () => { setPeriodOpen(true); if (match) navigate({ pathname: '/', hash }); };
    useEffect(() => {
        if (!view) return undefined;
        const onKey = (e) => { if (e.key === 'Escape' && !lightbox) closePanel(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    // À l'ouverture, amener le panneau en haut de l'écran (seulement vers le bas, jamais au premier affichage)
    const isOpen = !!view;
    useEffect(() => {
        if (!didMount.current) { didMount.current = true; return; }
        if (!isOpen) return;
        const panel = contentRef.current?.querySelector('.ws-panel');
        if (!panel) return;
        const top = panel.getBoundingClientRect().top + window.scrollY - 22;
        if (window.scrollY < top - 4) window.scrollTo({ top, behavior: 'smooth' });
    }, [isOpen]);

    const choosePeriod = (id) => {
        const target = id == null ? null : PERIODS.find(p => p.id === id);
        navigate({ pathname: match ? `/project/${match.params.id}` : '/', hash: target ? `#${target.slug}` : '' });
        setCategory(ALL);
    };
    const select = (project) => { setPeriodOpen(false); navigate({ pathname: `/project/${project.id}`, hash }); };
    const openVisuals = (project, index = 0) => project.images.length && setLightbox({
        images: project.images.map(im => ({
            src: im.src, full: im.full ?? im.src, title: project.title,
            description: im.description ?? phaseFor(project, periodId).description, link: project.link,
        })),
        index,
    });

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <div className="ws">
            {/* ===== Ligne du haut ===== */}
            <header className="ws-top">
                <Link to="/" className="ws-logo" aria-label="Home"><span>Y</span><i /></Link>
                <ScheduleBar selected={periodId} onSelect={choosePeriod} />
            </header>

            <div className="ws-body">
                {/* ===== Barre latérale ===== */}
                <nav className="ws-side" aria-label="Sections">
                    <Link to="/v2" className="ws-circle ws-circle--white ws-back" title="Previous version" aria-label="Previous version">
                        <ArrowLeft size={18} strokeWidth={1.5} />
                    </Link>
                    <div className="ws-side-stack">
                        <button className="ws-side-btn is-on" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Overview"><LayoutGrid size={17} strokeWidth={1.6} /></button>
                        <button className="ws-side-btn" onClick={() => scrollTo('projects')} title="All projects"><Layers size={17} strokeWidth={1.6} /></button>
                        <button className="ws-side-btn" onClick={showPeriod} title="Period summary"><CalendarRange size={17} strokeWidth={1.6} /></button>
                    </div>
                </nav>

                {/* ===== En-tête : titre + indicateurs ===== */}
                <section className="ws-head">
                    <h1 className="ws-title">PR<span className="ws-o">O</span>JECTS</h1>
                    <button className="ws-pill-btn" onClick={showPeriod}>
                        <span className="ws-pill-plus"><FileText size={14} strokeWidth={1.8} /></span>
                        Period summary
                    </button>
                    <div className="ws-kpis">
                        <Kpi value={stats.total} label="Projects" delta={stats.totalDelta} />
                        <Kpi value={stats.apps} label="live apps" delta={stats.appsDelta} />
                        <Kpi value={stats.continued} label="continued" />
                    </div>
                </section>

                {/* ===== Contenu ===== */}
                <div ref={contentRef} className={`ws-content ${view ? 'is-open' : ''}`}>
                <main className="ws-main">
                    <section id="projects" className="ws-section">
                        <div className="ws-section-head">
                            <h2>All Projects</h2>
                            <span className="ws-count"><b>{list.length}</b> Projects</span>
                            {period && (
                                <button className="ws-filter-tag" onClick={() => choosePeriod(null)} title="Show all periods">
                                    {period.short}<X size={13} strokeWidth={1.8} />
                                </button>
                            )}
                            <div className={`ws-search ${searchOpen || query ? 'is-open' : ''}`}>
                                <button className="ws-circle" onClick={() => setSearchOpen(o => !o)} aria-label="Search">
                                    <Search size={17} strokeWidth={1.5} />
                                </button>
                                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, tools…"
                                       tabIndex={searchOpen || query ? 0 : -1} />
                                {query && <button className="ws-search-clear" onClick={() => setQuery('')} aria-label="Clear"><X size={14} /></button>}
                            </div>
                            <button className={`ws-circle ${sortAZ ? 'is-on' : ''}`} onClick={() => setSortAZ(s => !s)}
                                    title={sortAZ ? 'Sorted A–Z' : 'Sorted by most recent'} aria-label="Toggle sort">
                                <SlidersHorizontal size={17} strokeWidth={1.5} />
                            </button>
                            <div className="ws-pills" role="tablist">
                                <button className={`ws-pill ${category === ALL ? 'is-on' : ''}`} onClick={() => setCategory(ALL)}>All</button>
                                {CATEGORIES.map(c => {
                                    const n = inPeriod.filter(p => p.category.id === c.id).length;
                                    const Icon = c.icon;
                                    return (
                                        <button key={c.id} className={`ws-pill ${category === c.id ? 'is-on' : ''}`}
                                                onClick={() => setCategory(c.id)} disabled={!n}>
                                            {Icon && <Icon size={14} strokeWidth={1.7} />}{c.short}<small>{n}</small>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {list.length ? (
                            <div className="ws-grid">
                                {list.map(p => (
                                    <Cell key={p.id}>
                                        <ProjectCard project={p} periodId={periodId}
                                                     selected={selectedId === p.id}
                                                     onSelect={() => select(p)} onOpenVisuals={openVisuals} />
                                    </Cell>
                                ))}
                            </div>
                        ) : (
                            <div className="ws-empty">{inPeriod.length ? 'No project matches this filter.' : 'Projects will appear here once the period content is added.'}</div>
                        )}
                    </section>
                </main>

                {view && (
                    <SummaryPanel view={view} periodId={periodId}
                                  period={period ?? LATEST_WITH_CONTENT}
                                  periodCount={projectsOfPeriod((period ?? LATEST_WITH_CONTENT).id).length}
                                  onOpen={openVisuals} onClose={closePanel} />
                )}
                </div>
            </div>

            <AnimatePresence>
                {lightbox && (
                    <Lightbox key="lightbox" images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
