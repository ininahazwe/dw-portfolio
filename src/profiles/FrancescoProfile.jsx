import React from 'react';
import '../styles/Judges.css';

const sectionData = [
    {
        id: 1,
        sectionName: "CRITÈRE #1",
        title: "Design & UX Enhancement",
        description: "Comprehensive redesign and user experience improvements across all interface elements, ensuring better accessibility, intuitive navigation, and modern visual standards",
        duration: "Coef. X4",
        category: "Évaluation Technique",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#eaf1ea"
    },
    {
        id: 2,
        sectionName: "CRITÈRE #2",
        title: "Production Deployment",
        description: "Full installation and configuration of the platform and its database on MFWA's organizational servers, ensuring data security and operational continuity",
        duration: "Coef. X3",
        category: "Performance",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#f7f4eb"
    },
    {
        id: 3,
        sectionName: "CRITÈRE #3",
        title: "Performance Optimization",
        description: "Advanced caching strategies and database optimization to ensure fast loading times and seamless interaction across 16 West African countries' data.",
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

const FrancescoProfile = () => {
    const totalItems = sectionData.length;

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

export default FrancescoProfile;