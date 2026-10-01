import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import '../styles/Judges.css';

import asset1 from '../assets/asset1.png';
import asset2 from '../assets/asset2.png';
import asset3 from '../assets/asset3.png';
import asset4 from '../assets/asset4.png';

const sectionData = [
    {
        id: 1,
        sectionName: "NEW FEATURE #1",
        title: "Digital Auction System\n",
        description: "New module enabling office equipment digital auction with bidding mechanism, automated notifications, and transaction tracking for sustainable asset lifecycle management",
        duration: "Coef. X4",
        category: "Évaluation Technique",
        imgUrl: asset2,
        bgColor: "#eaf1ea"
    },
    {
        id: 2,
        sectionName: "NEW FEATURE #2",
        title: "Hardware Incident Management",
        description: "Complete incident tracking system for equipment issues, repair workflows, resolution tracking, and historical incident analytics for preventive maintenance",
        duration: "Coef. X3",
        category: "Performance",
        imgUrl: asset4,
        bgColor: "#f7f4eb"
    },
    {
        id: 3,
        sectionName: "NEW FEATURE #3",
        title: "Equipment Procurement Module\n",
        description: "Streamlined purchasing workflow with purchase order generation, vendor management, budget tracking, and automated approval chains for transparent procurement processes",
        duration: "Historique",
        category: "Parcours Pro",
        imgUrl: asset3,
        bgColor: "#eaf1ea"
    },
    {
        id: 4,
        sectionName: "CONCLUSION",
        title: "Advanced Analytics Dashboard",
        description: "Real-time statistical dashboards displaying asset distribution, depreciation costs, incident trends, and procurement metrics for data-driven decision making",
        duration: "Final",
        category: "Synthèse",
        imgUrl: asset1,
        bgColor: "#ebdff2"
    }
];

const Asset = () => {
    const totalItems = sectionData.length;
    const [selectedImage, setSelectedImage] = useState(null);

    // Fermeture au clavier (Escape)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Bloquer le scroll du body quand le modal est ouvert
    useEffect(() => {
        document.body.style.overflow = selectedImage ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedImage]);

    return (
        <div className="profile-internal-content">

            <div className="profile-intro">
                <h2>IT ASSET INVENTORY</h2>
                <p>Centralized inventory and localization system for hardware assets with real-time statistics and comprehensive management capabilities.</p>
            </div>

            <div className="stack_wrapper">
                {sectionData.map((item, index) => {
                    const isLast = index === totalItems - 1;
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
                                    {/*<div className="inner-bottom">
                                        <div className="duration">
                                            <span className="projects-description duration">Importance</span>
                                            <span className="projects-title duration">{item.duration}</span>
                                        </div>
                                    </div>
                                    <div className="open-link">
                                        <span className="category">{item.category}</span>
                                        <span>→</span>
                                    </div>*/}
                                </div>
                            </div>

                            {/* Partie Droite : Image cliquable */}
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

            {/* Zone de scroll en bas */}
            <div className="profile-footer-spacer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a href="https://assets.mfwa.org/" className="cust-btn" target="_blank">Connect</a>
            </div>

            {/* Modal Lightbox */}
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

export default Asset;