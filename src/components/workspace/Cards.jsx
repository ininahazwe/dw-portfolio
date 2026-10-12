import { ArrowUpRight, ChevronDown, Images, Flame } from 'lucide-react';
import { phaseFor } from '../../data/derive';
import { useModel } from '../../data/DataProvider';
import Thumb from './Thumb';

// Couleurs des pastilles de progression, une par période (ambiance maquette)
const RAMP = ['#F58C8C', '#F7B267', '#F2D95C', '#9BDB6C', '#5FC98C', '#55B6D9'];

export function PhaseDots({ project }) {
    const { PERIODS } = useModel();
    const active = new Set(project.phases.map(ph => ph.periodId));
    return (
        <span className="ws-dots" aria-label={`Active in ${active.size} of ${PERIODS.length} periods`}>
            {PERIODS.map((p, i) => (
                <i key={p.id} title={p.short}
                   style={active.has(p.id) ? { background: RAMP[i % RAMP.length] } : undefined} />
            ))}
        </span>
    );
}

// Coin découpé de la carte, qui accueille les boutons ronds
function Notch({ children, wide = false }) {
    return <div className={`ws-notch ${wide ? 'ws-notch--wide' : ''}`}>{children}</div>;
}

const stop = (fn) => (e) => { e.stopPropagation(); fn?.(); };

/* ----- Carte "vitrine" (style New Leads) ----- */
export function HighlightCard({ project, periodId, selected, onSelect, isNewest }) {
    const phase = phaseFor(project, periodId);
    return (
        <article className={`ws-card ws-lead ${selected ? 'is-selected' : ''}`}
                 onClick={onSelect} tabIndex={0}
                 onKeyDown={(e) => e.key === 'Enter' && onSelect()}>
            <Notch>
                <button className="ws-circle" aria-label={`Open ${project.title}`}
                        onClick={stop(() => project.link ? window.open(project.link, '_blank', 'noopener') : onSelect())}>
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                </button>
            </Notch>

            <Thumb project={project} size={52} />
            <h3 className="ws-lead-title">{project.title}</h3>
            <p className="ws-lead-sub">{project.category.short}{project.tag ? ` · ${project.tag}` : ''}</p>

            <div className="ws-lead-foot">
                <div>
                    <span className="ws-label">Tools</span>
                    <div className="ws-chips">
                        {(phase.tech?.length ? phase.tech : [project.category.short]).slice(0, 2).map(t =>
                            <span key={t} className="ws-chip">{t}</span>)}
                    </div>
                </div>
                <div className="ws-lead-progress">
                    <span className="ws-label">
                        {isNewest && <Flame size={11} className="ws-flame" />}
                        {project.phases.length > 1 ? `${project.phases.length} phases` : 'Journey'}
                    </span>
                    <PhaseDots project={project} />
                </div>
            </div>
        </article>
    );
}

/* ----- Carte projet (style Your Day's Tasks) ----- */
export function ProjectCard({ project, periodId, selected, onSelect, onOpenVisuals }) {
    const { periodById, statusOf } = useModel();
    const CatIcon = project.category.icon;
    const status = statusOf(project, periodId);
    const hasVisuals = project.images.length > 0;
    const range = project.phases.map(ph => periodById[ph.periodId]?.short).filter(Boolean);
    return (
        <article className={`ws-card ws-task ${selected ? 'is-selected' : ''}`}
                 onClick={onSelect} tabIndex={0}
                 onKeyDown={(e) => e.key === 'Enter' && onSelect()}>
            <Notch wide>
                <button className="ws-circle" disabled={!hasVisuals}
                        aria-label={hasVisuals ? `View ${project.images.length} visuals` : 'No visuals'}
                        title={hasVisuals ? `${project.images.length} visuals` : 'No visuals yet'}
                        onClick={stop(() => onOpenVisuals(project))}>
                    <Images size={17} strokeWidth={1.5} />
                </button>
                <button className="ws-circle" aria-label={`Details of ${project.title}`} onClick={stop(onSelect)}>
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                </button>
            </Notch>

            <div className="ws-task-who">
                <span className="ws-thumb ws-thumb--icon" style={{ width: 44, height: 44 }}>
                    {CatIcon && <CatIcon size={18} strokeWidth={1.6} />}
                </span>
                <div>
                    <b>{project.category.short}</b>
                    <small>{project.tag ?? `${project.phases.length} phase${project.phases.length > 1 ? 's' : ''}`}</small>
                </div>
            </div>

            <div className="ws-task-main">
                <Thumb project={project} size={44} className="ws-thumb--soft" fallback="initials" />
                <div>
                    <h3 className="ws-task-title">{project.title}</h3>
                    <p className="ws-task-date">{range.join('  →  ')}</p>
                </div>
            </div>

            <span className="ws-label">Status</span>
            <div className="ws-task-foot">
                <span className="ws-status">
                    <i className={`ws-status-dot is-${status.toLowerCase()}`} />
                    {status}
                    <ChevronDown size={15} strokeWidth={1.5} />
                </span>
                {project.link && (
                    <a className="ws-circle ws-circle--dark" href={project.link} target="_blank" rel="noopener noreferrer"
                       aria-label="Open live app" title="Open live app" onClick={(e) => e.stopPropagation()}>
                        <ArrowUpRight size={18} strokeWidth={1.6} />
                    </a>
                )}
            </div>
        </article>
    );
}
