import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Judges.css';

// --- 1. IMPORTATION DE TES FUTURES PAGES DE CONTENU ---
import MediascapeProfile from '../profiles/Mediascape';
import MediaIndexProfile from "../profiles/MediaIndex.jsx";
import RedlistProfile from "../profiles/RedList.jsx";
import TrackerProfile from '../profiles/Tracker';
import AssetProfile from '../profiles/Asset.jsx';
import RegistrationProfile from '../profiles/Registration.jsx';
import ConstructionAnimationLottie from "./ConstructionAnimationLottie.jsx";
import Registration from "../profiles/Registration.jsx";
import Timeline from "./Timeline.jsx"; // ✅ IMPORT DE LA TIMELINE

import trackerAvatar from '../assets/Tracker1.png';
import mediaIndexAvatar from '../assets/index4.png';
import mediascapeAvatar from '../assets/mediascape.png';
import assetAvatar from '../assets/asset.png';
import redListAvatar from '../assets/memorial.png';
//import registrationAvatar from '../assets/wameca.png';

const judgesData = [
    { id: 'tracker', name: 'Activity Tracker', title: 'Platform cataloging organizational projects with impact measurement indicators', avatarUrl: trackerAvatar, totalScore: 'NEW', scores: [{ label: 'UI', val: '8.7' }, { label: 'UX', val: '8.7' }, { label: 'INN', val: '9' }] },
    { id: 'mediaIndex', name: 'Media Index', title: 'Rating platform for Ghanaian media outlets based on audience data analysis', avatarUrl: mediaIndexAvatar, totalScore: 'NEW', scores: [{ label: 'UI', val: '8' }, { label: 'UX', val: '8' }, { label: 'INN', val: '8' }] },
    { id: 'mediascape', name: 'Mediascape', title: 'Interactive map visualizing media freedom and digital rights across West Africa', avatarUrl: mediascapeAvatar, totalScore: '', scores: [{ label: 'UI', val: '8.7' }, { label: 'UX', val: '8.7' }, { label: 'INN', val: '9' }] },
    { id: 'asset', name: 'It Asset Inventory', title: 'Centralized system for hardware asset management with real-time statistics', avatarUrl: assetAvatar, totalScore: '', scores: [{ label: 'UI', val: '8.5' }, { label: 'UX', val: '8.5' }, { label: 'INN', val: '8.5' }] },
    { id: 'redList', name: 'Red List', title: 'Memorial platform honoring West African journalists killed in the line of duty', avatarUrl: redListAvatar, totalScore: '', scores: [{ label: 'UI', val: '8.2' }, { label: 'UX', val: '8.3' }] },
    //{ id: 'registration', name: 'Event registration', title: 'Event registration and participant management with automated badge generation', avatarUrl: registrationAvatar, totalScore: '', scores: [{ label: 'UI', val: '8.2' }, { label: 'UX', val: '8.2' }, { label: 'INN', val: '8.2' }] },
];

export const JudgesSection = () => {
    const [activeJudge, setActiveJudge] = useState(null);

    // --- 2. DICTIONNAIRE QUI ASSOCIE L'ID À SA PAGE CORRESPONDANTE ---
    const profilePages = {
        'mediascape': <MediascapeProfile />,
        'mediaIndex': <MediaIndexProfile />,
        'asset': <AssetProfile />,
        'redList': <RedlistProfile />,
        'tracker': <TrackerProfile />,
        'registration': <RegistrationProfile />,
    };

    return (
        <section className="judges-section">

            {/* VUE PAR DÉFAUT : TIMELINE + 6 BLOCS */}
            {!activeJudge && (
                <>
                    <header className="judges-main-header" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: 'auto' }}>
                        <ConstructionAnimationLottie width={200} height={"auto"} />

                        {/* ✅ TIMELINE REMPLACE LES ANCIENS h3 ET h5 */}
                        <Timeline />
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
                                            {/*{judge.scores.map((score, idx) => (
                                                <li key={idx} className="judge-card-metric-item">
                                                    <span style={{ color: '#777' }}>{score.label}</span>
                                                    <strong>{score.val}</strong>
                                                </li>
                                            ))}*/}
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

            {/* ZONE PORTAIL À 90% DE HAUTEUR */}
            <AnimatePresence mode="wait">
                {activeJudge && (
                    <motion.div key={activeJudge.id} className="judge-view-portal">

                        <motion.div layoutId={`bgShuffle-${activeJudge.id}`} className="judge-view-expanded-bg" />

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