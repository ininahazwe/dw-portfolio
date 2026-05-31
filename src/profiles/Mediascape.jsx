import React, {useState} from 'react';
import '../styles/Judges.css';

import mediascape1 from '../assets/mediascape.png';
import mediascape2 from '../assets/mediascape4.png';
import mediascape3 from '../assets/mediascape2.png';
import mediascape4 from '../assets/mediascape3.png';
import {AnimatePresence, motion as Motion} from "framer-motion";
import {X} from "lucide-react";

const sectionData = [
    {
        id: 1,
        sectionName: "FEATURE #1",
        title: "Design & UX Enhancement",
        description: "Comprehensive redesign and user experience improvements across all interface elements, ensuring better accessibility, intuitive navigation, and modern visual standards",
        duration: "Coef. X4",
        category: "Évaluation Technique",
        imgUrl: mediascape1,
        bgColor: "#eaf1ea"
    },
    {
        id: 2,
        sectionName: "FEATURE #2",
        title: "Production Deployment",
        description: "Full installation and configuration of the platform and its database on MFWA's organizational servers, ensuring data security and operational continuity",
        duration: "Coef. X3",
        category: "Performance",
        imgUrl: mediascape2,
        bgColor: "#f7f4eb"
    },
    {
        id: 3,
        sectionName: "FEATURE #3",
        title: "Performance Optimization",
        description: "Advanced caching strategies and database optimization to ensure fast loading times and seamless interaction across 16 West African countries' data.",
        duration: "Historique",
        category: "Parcours Pro",
        imgUrl: mediascape3,
        bgColor: "#eaf1ea"
    }
];

const Mediascape = () => {
    const totalItems = sectionData.length;
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="profile-internal-content">

            <div className="profile-intro">
                <h2>MEDIASCAPE</h2>
                <p>Interactive map visualizing media freedom, press environment, and digital rights across West Africa</p>
            </div>

            <div className="stack_wrapper">
                {sectionData.map((item, index) => {
                    const isLast = index === totalItems - 1;

                    // Calcul du positionnement collant (Sticky top)
                    // Les cartes normales s'empilent en escalier (ex: 8rem, puis 10.5rem, puis 13rem...)
                    // La dernière carte remonte tout en haut (8rem) pour recouvrir le reste
                    const stickyTop = isLast ? "2.5rem" : `calc(2.5rem + ${index * 60}px)`;

                    return (
                        <div
                            className={`stack_card ${isLast ? 'last-card' : ''}`}
                            key={item.id}
                            style={{
                                top: stickyTop,
                                backgroundColor: item.bgColor
                            }}
                        >
                            {/* Partie Gauche : Textes */}
                            <div className="left-card">
                                <div className="title">
                                    <span className="section-name">{item.sectionName}</span>
                                    <h3 className="projects-title">{item.title}</h3>
                                    <p className="projects-description">{item.description}</p>
                                </div>

                                <div className="bottom-part">
                                    <div className="inner-bottom">
                                        <div className="duration">
                                            <span className="projects-description duration">Importance</span>
                                            <span className="projects-title duration">{item.duration}</span>
                                        </div>
                                    </div>
                                    <div className="open-link">
                                        <span className="category">{item.category}</span>
                                        <span>→</span>
                                    </div>
                                </div>
                            </div>

                            {/* Partie Droite : Image */}
                            <div className="div-block-107">
                                <Motion.img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    loading="lazy"
                                    onClick={() => setSelectedImage(item)}
                                    whileHover={{ scale: 1.03, cursor: 'zoom-in' }}
                                    transition={{ duration: 0.2 }}
                                    style={{ cursor: 'zoom-in' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Zone de scroll en bas pour permettre à la dernière carte de s'activer pleinement */}
            <div className="profile-footer-spacer"></div>
            <AnimatePresence>
                {selectedImage && (
                    <>
                        {/* Backdrop */}
                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.82)',
                                zIndex: 1000,
                                backdropFilter: 'blur(4px)',
                                WebkitBackdropFilter: 'blur(4px)',
                            }}
                        />

                        {/* Boîte modale */}
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.88, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{
                                position: 'fixed',
                                top: '25%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                x: '-50%',   // ← ici, pas dans transform
                                y: '-50%',   // ← ici, pas dans transform
                                zIndex: 1001,
                                background: '#ffffff',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                maxWidth: '680px',
                                width: '92%',
                                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
                            }}
                        >
                            {/* Bouton fermeture */}
                            <Motion.button
                                onClick={() => setSelectedImage(null)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    position: 'absolute',
                                    top: '14px',
                                    right: '14px',
                                    zIndex: 10,
                                    background: 'rgba(0,0,0,0.55)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#ffffff',
                                }}
                            >
                                <X size={18} />
                            </Motion.button>

                            {/* Image */}
                            <Motion.img
                                key={selectedImage.id}
                                src={selectedImage.imgUrl}
                                alt={selectedImage.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    width: '100%',
                                    maxHeight: '68vh',
                                    objectFit: 'contain',
                                    display: 'block',
                                    background: '#f5f5f5',
                                }}
                            />

                            {/* Footer */}
                            <div style={{
                                padding: '16px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #ebebeb',
                            }}>
                                <div>
                                    <span style={{
                                        display: 'block',
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.1em',
                                        color: '#999',
                                        textTransform: 'uppercase',
                                        marginBottom: '2px',
                                    }}>
                                        {selectedImage.sectionName}
                                    </span>
                                    <span style={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#1a1a1a',
                                    }}>
                                        {selectedImage.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    style={{
                                        background: 'none',
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        padding: '7px 16px',
                                        fontSize: '0.85rem',
                                        color: '#555',
                                        cursor: 'pointer',
                                        transition: 'background 0.15s',
                                    }}
                                    onMouseEnter={e => e.target.style.background = '#f5f5f5'}
                                    onMouseLeave={e => e.target.style.background = 'none'}
                                >
                                    Fermer
                                </button>
                            </div>
                        </Motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Mediascape;