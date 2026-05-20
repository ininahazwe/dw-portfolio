import React from 'react';
import '../styles/Judges.css';

const sectionData = [
    {
        id: 1,
        sectionName: "CRITÈRE #1",
        title: "Technique & Précision",
        description: "Analyse approfondie de la posture, de la fluidité des mouvements et de l'exécution technique globale lors des phases de transition.",
        duration: "Coef. X4",
        category: "Évaluation Technique",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#eaf1ea"
    },
    {
        id: 2,
        sectionName: "CRITÈRE #2",
        title: "Expression Artistique",
        description: "Évaluation de la musicalité, de l'originalité de la chorégraphie et de la capacité à transmettre une émotion forte au public.",
        duration: "Coef. X3",
        category: "Performance",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#f7f4eb"
    },
    {
        id: 3,
        sectionName: "CRITÈRE #3",
        title: "Expérience & Background",
        description: "Plus de 15 ans passés sur la scène internationale en tant que chorégraphe et consultant pour les plus grands événements mondiaux.",
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
                <h2>À propos de Francesco</h2>
                <p>Découvrez ses critères d'évaluation majeurs et son parcours à travers notre galerie interactive.</p>
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