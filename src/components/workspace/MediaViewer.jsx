import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';

/**
 * Visionneuse des visuels d'un projet (design v3 : à plat, clair).
 * images : [{ src, full?, title, description?, category?, link? }]
 * Clavier : ← → pour naviguer, Échap pour fermer.
 */
export default function MediaViewer({ images, startIndex = 0, onClose }) {
    const [index, setIndex] = useState(startIndex);
    const image = images[index];
    const last = images.length - 1;
    const go = (i) => setIndex(Math.min(last, Math.max(0, i)));

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1));
            if (e.key === 'ArrowRight') setIndex(i => Math.min(last, i + 1));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [last, onClose]);

    if (!image) return null;

    return (
        <div className="ws-viewer" role="dialog" aria-modal="true" aria-label={`${image.title} — visuals`}>
            <Motion.div className="ws-viewer-scrim"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} onClick={onClose} />
            <Motion.div className="ws-viewer-card"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                <button className="ws-circle ws-viewer-close" onClick={onClose} aria-label="Close" title="Close (Esc)">
                    <X size={18} strokeWidth={1.7} />
                </button>

                <div className="ws-viewer-stage">
                    <Motion.img key={index} src={image.full ?? image.src} alt={image.title}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                </div>

                <aside className="ws-viewer-side">
                    <div className="ws-viewer-info">
                        {image.category && <span className="ws-chip">{image.category}</span>}
                        <h3>{image.title}</h3>
                        {image.description && <p>{image.description}</p>}
                        {image.link && (
                            <a className="ws-viewer-link" href={image.link} target="_blank" rel="noopener noreferrer">
                                Open live app <ArrowUpRight size={15} strokeWidth={1.7} />
                            </a>
                        )}
                    </div>

                    <div className="ws-viewer-foot">
                        {images.length > 1 && (
                            <div className="ws-viewer-thumbs" role="tablist" aria-label="Visuals">
                                {images.map((im, i) => (
                                    <button key={i} role="tab" aria-selected={i === index} aria-label={`Visual ${i + 1}`}
                                            className={i === index ? 'is-on' : ''} onClick={() => go(i)}>
                                        <img src={im.src} alt="" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="ws-viewer-nav">
                            <button className="ws-circle" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous">
                                <ArrowLeft size={17} strokeWidth={1.6} />
                            </button>
                            <span>{index + 1} / {images.length}</span>
                            <button className="ws-circle" onClick={() => go(index + 1)} disabled={index === last} aria-label="Next">
                                <ArrowRight size={17} strokeWidth={1.6} />
                            </button>
                        </div>
                    </div>
                </aside>
            </Motion.div>
        </div>
    );
}
