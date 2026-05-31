import React from 'react';
import '../styles/Judges.css';

const sectionData = [
    {
        id: 1,
        sectionName: "FEATURE #1",
        title: "Multi-Platform Form Submission",
        description: "Flexible form submission system accessible across all digital channels (web, mobile, SMS, USSD) for inclusive data collection from diverse audience segments",
        duration: "Coef. X4",
        category: "Évaluation Technique",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#eaf1ea"
    },
    {
        id: 2,
        sectionName: "FEATURE #2",
        title: "Local Server Hosting",
        description: "Complete migration of media data and evaluation records to MFWA's local server infrastructure, ensuring data sovereignty and enhanced data security",
        duration: "Coef. X3",
        category: "Performance",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#f7f4eb"
    },
    {
        id: 3,
        sectionName: "FEATURE #3",
        title: "Automated Analytics Dashboard",
        description: "Intelligent dashboard automating media rating calculations based on predefined indicators, with real-time performance metrics and comparative benchmarking visualizations",
        duration: "Historique",
        category: "Parcours Pro",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#eaf1ea"
    },
    {
        id: 4,
        sectionName: "CONCLUSION",
        title: "Le Verdict Global",
        description: "Une approche intransigeante mais juste, visant à propulser les talents vers leur maximum potentiel.",
        duration: "Final",
        category: "Synthèse",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#ebdff2"
    }
];

const MediaIndex = () => {
    const totalItems = sectionData.length;

    return (
        <div className="profile-internal-content">

            <div className="profile-intro">
                <h2>MEDIA INDEX</h2>
                <p>Rating and evaluation platform for Ghanaian media outlets based on audience data collection and systematic analysis of media performance indicators</p>
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
                                <img src={item.imgUrl} alt={item.title} loading="lazy" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Zone de scroll en bas pour permettre à la dernière carte de s'activer pleinement */}
            <div className="profile-footer-spacer"></div>
        </div>
    );
};

export default MediaIndex;