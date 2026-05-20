import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Judges.css';

// --- 1. IMPORTATION DE TES FUTURES PAGES DE CONTENU ---
// Tu créeras ces fichiers juste après
import FrancescoProfile from '../profiles/FrancescoProfile';
import ConstructionAnimationLottie from "./ConstructionAnimationLottie.jsx";
// import SergeyProfile from './profiles/SergeyProfile';
// Import ZhouProfile from './profiles/ZhouProfile';
// Import MattiaProfile from './profiles/MattiaProfile';
// Import KristijanProfile from './profiles/KristijanProfile';
// Import MichiProfile from './profiles/MichiProfile';

const judgesData = [
    { id: 'francesco-carli', name: 'Activity Tracker', title: 'Creative & Art Director', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', totalScore: 'NEW', scores: [{ label: 'UI', val: '8.7' }, { label: 'UX', val: '8.7' }, { label: 'INN', val: '9' }] },
    { id: 'michi-del-rosso', name: 'Media Index', title: 'Co-Founder & CD', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80', totalScore: 'NEW', scores: [{ label: 'UI', val: '8' }, { label: 'UX', val: '8' }, { label: 'INN', val: '8' }] },
    { id: 'francesco-carli', name: 'Mediascape', title: 'Creative & Art Director', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', totalScore: '', scores: [{ label: 'UI', val: '8.7' }, { label: 'UX', val: '8.7' }, { label: 'INN', val: '9' }] },
    { id: 'sergey-dubovenko', name: 'It Asset Inventory', title: 'CEO & Founder', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', totalScore: '', scores: [{ label: 'UI', val: '8.5' }, { label: 'UX', val: '8.5' }, { label: 'INN', val: '8.5' }] },
    { id: 'zhou-wen-jun', name: 'Red List', title: 'Galery of West Africa’s slain journalists since 1990', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', totalScore: '', scores: [{ label: 'UI', val: '8.2' }, { label: 'UX', val: '8.3' }] },
    { id: 'mattia-rinaudo', name: 'Event registration', title: 'Design Manager', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80', totalScore: '', scores: [{ label: 'UI', val: '8.2' }, { label: 'UX', val: '8.2' }, { label: 'INN', val: '8.2' }] },
];

export const JudgesSection = () => {
    const [activeJudge, setActiveJudge] = useState(null);

    // --- 2. DICTIONNAIRE QUI ASSOCIE L'ID À SA PAGE CORRESPONDANTE ---
    const profilePages = {
        'francesco-carli': <FrancescoProfile />,
        //'sergey-dubovenko': <SergeyProfile />,
        // Tu ajouteras les autres ici au fur et à mesure :
        // 'zhou-wen-jun': <ZhouProfile />,
    };

    return (
        <section className="judges-section">

            {/* VUE PAR DÉFAUT : LES 6 BLOCS INITIALS */}
            {!activeJudge && (
                <>
                    <header className="judges-main-header" style={{display: "flex", justifyContent: "center"}}>
                        <ConstructionAnimationLottie width={200} height={"auto"} />
                        {/*<h3 className="judges-main-score">8.19</h3>*/}
                        {/*<h5 className="judges-main-subtitle">Final Judge's Score</h5>*/}
                    </header>

                    <div className="judges-grid-container">
                        <ul className="judges-grid">
                            {judgesData.map((judge) => (
                                <li key={judge.id} className="judges-grid-item">
                                    <motion.div
                                        className="judge-card-rect"
                                        onClick={() => setActiveJudge(judge)}
                                        whileHover={{ scale: 1.02, backgroundColor: '#d0cbc0' }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    >
                                        <motion.div layoutId={`bgShuffle-${judge.id}`} className="judge-card-bg-layer" />
                                        <div className="judge-card-top-score">{judge.totalScore}</div>
                                        <div className="judge-card-avatar">
                                            <img src={judge.avatarUrl} alt={judge.name} />
                                        </div>
                                        <div>
                                            <h4 className="judge-card-name">{judge.name}</h4>
                                            <h6 className="judge-card-title">{judge.title}</h6>
                                        </div>
                                        <ul className="judge-card-metrics">
                                            {judge.scores.map((score, idx) => (
                                                <li key={idx} className="judge-card-metric-item">
                                                    <span style={{ color: '#777' }}>{score.label}</span>
                                                    <strong>{score.val}</strong>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* LE MENU HORIZONTAL MINIATURE À 10% */}
            {activeJudge && (
                <motion.nav
                    className="judges-top-menu"
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                >
                    {judgesData.map((judge) => (
                        <div
                            key={judge.id}
                            className={`menu-tab-item ${activeJudge.id === judge.id ? 'is-active' : ''}`}
                            onClick={() => setActiveJudge(judge)}
                        >
                            <div className="menu-tab-avatar">
                                <img src={judge.avatarUrl} alt={judge.name} />
                            </div>
                            <div className="menu-tab-name">{judge.name}</div>
                            <div className="menu-tab-score">{judge.totalScore}</div>
                        </div>
                    ))}
                </motion.nav>
            )}

            {/* ZONE PORTAIL À 90% DE HAUTEUR AVEC LA PAGE INTERNE DYNAMIQUE */}
            <AnimatePresence mode="wait">
                {activeJudge && (
                    <motion.div key={activeJudge.id} className="judge-view-portal">

                        <motion.div layoutId={`bgShuffle-${activeJudge.id}`} className="judge-view-expanded-bg" />

                        {/* Animation de transition globale (fade + slide-up) pour le contenu de la page chargée */}
                        <motion.div
                            className="judge-view-inner-content"
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <button className="judge-portal-close" onClick={() => setActiveJudge(null)}>
                                Close
                            </button>

                            {/* Rendu dynamique de ton fichier/composant de page propre */}
                            {profilePages[activeJudge.id] || (
                                <div style={{ padding: '40px', textAlign: 'center' }}>
                                    <h2>{activeJudge.name}</h2>
                                    <p>La page de ce profil est en cours de création...</p>
                                </div>
                            )}
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};