import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Timeline.css';

const Timeline = () => {
    const handleNavigateToPreviousSemester = () => {
        alert('Navigation vers April-October 2025 (à développer)');
        // window.location.href = '/april-october-2025';
    };

    return (
        <section className="main-timeline-section">
            {/* Cercle de départ */}
            <div className="timeline-start"></div>

            {/* Ligne centrale horizontale */}
            <div className="conference-center-line"></div>

            {/* Conteneur des marqueurs de temps */}
            <div className="conference-timeline-content">

                {/* Marqueur 1 : Apr 25 - Oct 25 (haut, GAUCHE) */}
                <motion.div
                    className="timeline-article timeline-article-left timeline-article-top"
                    whileHover={{ scale: 1.05 }}
                    onClick={handleNavigateToPreviousSemester}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="content-date">
                        <span>Apr 25 — Oct 25</span>
                    </div>
                    <div className="meta-date"></div>
                    {/*<div className="content-box">*/}
                    {/*    <p>1st semester</p>*/}
                    {/*</div>*/}
                </motion.div>

                {/* Marqueur 2 : Oct 25 - Apr 26 (bas, MILIEU, ACTIF) */}
                <motion.div
                    className="timeline-article timeline-article-center timeline-article-bottom active"
                    //whileHover={{ scale: 1.05 }}
                    style={{ transformOrigin: 'center center' }}
                >
                    <div className="content-date">
                        <span>Oct 25 — Apr 26</span>
                    </div>
                    <div className="meta-date"></div>
                    <div className="content-box">
                        <p>
                            From October to April, my mission at MFWA centered on two pillars:<br />
                            <b>advancing the applications</b> built in the first semester, <br />and <b>developing new platforms</b> addressing specific digitalization needs. This period reflects a strategic focus on evolving existing solutions while creating innovative systems that transform how teams work, embedding digital transformation into the core of organizational processes.
                        </p>
                    </div>
                </motion.div>

                {/* Marqueur 3 : Future (haut, DROITE, vide) */}
                <motion.div
                    className="timeline-article timeline-article-right timeline-article-top timeline-article-empty"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="meta-date"></div>
                </motion.div>

            </div>

            {/* Cercle de fin */}
            <div className="timeline-end"></div>
        </section>
    );
};

export default Timeline;