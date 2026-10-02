import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { X } from 'lucide-react';
import './imageGallery.css';

// Visionneur plein écran — même rendu/classes que ImageGallery (prod),
// mais indexé par position (les ids du fichier de données ne sont pas uniques).
const Lightbox = ({ images, startIndex = 0, onClose }) => {
    const [index, setIndex] = useState(startIndex);
    const image = images[index];

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1));
            if (e.key === 'ArrowRight') setIndex(i => Math.min(images.length - 1, i + 1));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [images.length, onClose]);

    if (!image) return null;

    return (
        <>
            <Motion.div
                className="gallery-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
            />
            <Motion.div
                className="gallery-modal"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <Motion.button className="gallery-close-button" onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <X size={24} />
                </Motion.button>

                <div className="gallery-modal-content">
                    <Motion.img
                        key={index}
                        src={image.full ?? image.src ?? image.fullsize ?? image.thumbnail}
                        alt={image.title}
                        className="gallery-modal-image"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                    />
                    <div className="gallery-modal-info">
                        <h3 className="modal-title">{image.title}</h3>
                        <p className="modal-description">{image.description}</p>
                        {image.link && (
                            <span className="modal-category">
                                <a href={image.link} target="_blank" rel="noopener noreferrer">Explore me</a>
                            </span>
                        )}
                    </div>
                </div>

                <div className="gallery-navigation">
                    <Motion.button className="nav-button nav-previous" onClick={() => setIndex(i => i - 1)} disabled={index === 0} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>←</Motion.button>
                    <span className="nav-counter">{index + 1} / {images.length}</span>
                    <Motion.button className="nav-button nav-next" onClick={() => setIndex(i => i + 1)} disabled={index === images.length - 1} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>→</Motion.button>
                </div>
            </Motion.div>
        </>
    );
};

export default Lightbox;
