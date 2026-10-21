import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, Maximize2, Sparkles, X } from 'lucide-react';
import { splitMetric } from '../../data/derive';
import { useModel } from '../../data/DataProvider';
import placeholder from '../../assets/placeholder-project.svg';

/* Panneau de droite : "carte vidéo" (visuels) + panneau noir "Summary". */

function MediaCard({ project, onOpen }) {
    const [index, setIndex] = useState(0);
    const images = project.images;
    const img = images[index];
    const CatIcon = project.category.icon;
    return (
        <div className="ws-media">
            {img
                ? <img src={img.src} alt={project.title} />
                : <img className="ws-media-empty" src={placeholder} alt="" />}
            <span className="ws-media-badge">{CatIcon && <CatIcon size={17} strokeWidth={1.7} />}</span>
            <div className="ws-media-tr">
                {img && (
                    <button className="ws-glass" aria-label="Full screen" onClick={() => onOpen(project, index)}>
                        <Maximize2 size={15} strokeWidth={1.6} />
                    </button>
                )}
            </div>
            <div className="ws-media-controls">
                {images.length > 1 && (
                    <button className="ws-glass" disabled={index === 0} onClick={() => setIndex(i => i - 1)} aria-label="Previous visual">
                        <ChevronLeft size={17} strokeWidth={1.6} />
                    </button>
                )}
                <span className="ws-glass ws-glass--text">
                    {images.length ? `${index + 1} / ${images.length}` : 'No visual yet'}
                </span>
                {images.length > 1 && (
                    <button className="ws-glass" disabled={index >= images.length - 1} onClick={() => setIndex(i => i + 1)} aria-label="Next visual">
                        <ChevronRight size={17} strokeWidth={1.6} />
                    </button>
                )}
                {project.link && (
                    <a className="ws-glass ws-glass--lime" href={project.link} target="_blank" rel="noopener noreferrer"
                       aria-label="Open live app" title="Open live app">
                        <ArrowUpRight size={18} strokeWidth={1.8} />
                    </a>
                )}
            </div>
        </div>
    );
}

function ProjectSummary({ project, periodId, onOpen }) {
    const { periodById } = useModel();
    const phases = [...project.phases].reverse(); // plus récente en haut
    return (
        <>
            <div className="ws-sum-intro">
                <h4>{project.title}</h4>
                <p>{project.category.title}{project.tag ? ` · ${project.tag}` : ''}</p>
            </div>
            <ol className="ws-sum-timeline">
                {project.images.length > 0 && (
                    <li>
                        <span className="ws-sum-time">Media</span>
                        <i className="ws-sum-node" />
                        <div className="ws-sum-block">
                            <div className="ws-sum-block-head">
                                <h5>Visuals:</h5>
                                <button className="ws-circle ws-circle--ghost" aria-label="Open visuals" onClick={() => onOpen(project, 0)}>
                                    <Download size={15} strokeWidth={1.6} />
                                </button>
                            </div>
                            <div className="ws-docs">
                                {project.images.slice(0, 3).map((im, i) => (
                                    <button key={i} className="ws-doc" onClick={() => onOpen(project, i)}>
                                        <img src={im.src} alt="" loading="lazy" />
                                        <span>{im.category ?? `Visual ${i + 1}`}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </li>
                )}
                {phases.map(ph => {
                    const period = periodById[ph.periodId];
                    const metric = splitMetric(ph.metrics);
                    const current = ph.periodId === (periodId ?? project.lastPeriod);
                    return (
                        <li key={ph.periodId}>
                            <span className="ws-sum-time">{period?.short.split(' – ')[0]}</span>
                            <i className={`ws-sum-node ${current ? 'is-on' : ''}`} />
                            <div className={`ws-sum-block ${current ? 'is-lime' : ''}`}>
                                <div className="ws-sum-block-head">
                                    <h5>{period?.short}</h5>
                                    {ph.dates && <small>{ph.dates}</small>}
                                </div>
                                <p className="ws-sum-text">{ph.description}</p>
                                {(metric || ph.metrics) && (
                                    <p className="ws-sum-metric">
                                        {metric ? <><b>{metric.value}</b> {metric.label}</> : <b>{ph.metrics}</b>}
                                    </p>
                                )}
                                {ph.tech?.length > 0 && (
                                    <div className="ws-chips ws-chips--dark">
                                        {ph.tech.map(t => <span key={t} className="ws-chip">{t}</span>)}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}

function PeriodSummary({ period, count }) {
    return (
        <>
            <div className="ws-sum-intro">
                <h4>{period.title}</h4>
                <p>{period.subtitle} · {count} projects</p>
            </div>
            <ol className="ws-sum-timeline">
                <li>
                    <span className="ws-sum-time">{period.short.split(' – ')[0]}</span>
                    <i className="ws-sum-node is-on" />
                    <div className="ws-sum-block is-lime">
                        <div className="ws-sum-block-head"><h5>Summary:</h5></div>
                        <p className="ws-sum-text">{period.summary || period.description}</p>
                    </div>
                </li>
                {period.highlights?.length > 0 && (
                    <li>
                        <span className="ws-sum-time">Key</span>
                        <i className="ws-sum-node" />
                        <div className="ws-sum-block">
                            <div className="ws-sum-block-head"><h5>Highlights:</h5></div>
                            <ul className="ws-sum-list">{period.highlights.map(h => <li key={h}>{h}</li>)}</ul>
                        </div>
                    </li>
                )}
            </ol>
        </>
    );
}

export default function SummaryPanel({ view, periodId, period, periodCount, onOpen, onClose }) {
    const project = view?.type === 'project' ? view.project : null;
    const key = project ? project.id : `period-${period?.id}`;
    return (
        <Motion.aside className="ws-panel" aria-label={project ? project.title : 'Period summary'}
                      initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <button className="ws-panel-close" onClick={onClose} aria-label="Close" title="Close (Esc)">
                <X size={20} strokeWidth={1.7} />
            </button>
            <AnimatePresence mode="wait">
                <Motion.div key={key} className="ws-panel-inner"
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}>
                    {project && <MediaCard project={project} onOpen={onOpen} />}

                    <div className="ws-summary">
                        <div className="ws-summary-head">
                            <span className="ws-circle ws-circle--ghost"><Sparkles size={16} strokeWidth={1.5} /></span>
                            <h3>Summary</h3>
                        </div>
                        <div className="ws-summary-body">
                            {project
                                ? <ProjectSummary project={project} periodId={periodId} onOpen={onOpen} />
                                : period && <PeriodSummary period={period} count={periodCount} />}
                        </div>
                    </div>
                </Motion.div>
            </AnimatePresence>
        </Motion.aside>
    );
}
