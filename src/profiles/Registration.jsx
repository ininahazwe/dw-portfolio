import React from 'react';
import '../styles/Judges.css';

const sectionData = [
    {
        id: 1,
        sectionName: "NEW FEATURE #1",
        title: "Multi-Event Adaptation",
        description: "Extended platform compatibility to support diverse event types and formats beyond WAMECA, enabling flexible registration workflows for different event needs",
        duration: "Coef. X4",
        category: "Évaluation Technique",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#eaf1ea"
    },
    {
        id: 2,
        sectionName: "NEW FEATURE #2",
        title: "Flexible Registration Workflows",
        description: "Customizable registration forms and workflows tailored to specific event requirements, supporting multiple registration tiers and ticket types",
        duration: "Coef. X3",
        category: "Performance",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#f7f4eb"
    },
    {
        id: 3,
        sectionName: "NEW FEATURE #3",
        title: "Scalable Badge System",
        description: "Enhanced badge printing integration supporting batch processing and various badge formats for large-scale events with thousands of participants.",
        duration: "Historique",
        category: "Parcours Pro",
        imgUrl: "https://via.placeholder.com/400",
        bgColor: "#eaf1ea"
    }
];

const Registration = () => {
    const totalItems = sectionData.length;

    return (
        <div className="profile-internal-content">

            <div className="profile-intro">
                <h2>Event Checkin</h2>
                <p>Event registration and participant management system designed for seamless onboarding, real-time check-in, and automated badge generation.</p>
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

export default Registration;