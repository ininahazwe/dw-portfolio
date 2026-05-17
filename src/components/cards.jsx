import React, { useState } from 'react';

// Structure des sous-pages (le contenu qui s'injecte dans le détail)
const SUB_LINKS_DATA: Record<string, { title: string; href: string; isPodcast?: boolean }[]> = {
    "me-van-a-operar": [
        { title: "Qué tengo que saber", href: "https://guiacirugiacardiaca.com/t/que-tengo-que-saber/" },
        { title: "Cambia de hábitos", href: "https://guiacirugiacardiaca.com/t/cambia-de-habitos/" },
        { title: "Alimentación", href: "https://guiacirugiacardiaca.com/t/alimentacion/" },
        { title: "Actividad física", href: "https://guiacirugiacardiaca.com/t/actividad-fisica/" },
        { title: "El equipo que te acompaña en la cirugía", href: "#", isPodcast: true },
        // ... Tu peux ajouter les autres ici
    ],
    "tengo-un-problema-en-el-corazon": [
        { title: "Conoce tu corazón", href: "#" }
    ]
};

const CARDS_DATA = [
    { id: 1, slug: "tengo-un-problema-en-el-corazon", color: "#b9e7de", name: "El corazón", phrase: "Conoce tu corazón", onSrc: "...", offSrc: "..." },
    { id: 2, slug: "me-van-a-operar", color: "#ffd05b", name: "Me van a operar", phrase: "Preparación", onSrc: "...", offSrc: "..." },
    { id: 3, slug: "antes-de-la-cirugia", color: "#40d39c", name: "Antes de la cirugía", phrase: "Preparación", onSrc: "...", offSrc: "..." },
    // ... Les autres cartes
];

export default function HomeHeader() {
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

    // On trouve les données de la carte sélectionnée pour récupérer sa couleur
    const selectedCard = CARDS_DATA.find(c => c.slug === selectedSlug);

    return (
        <div className="home_header">
            <div className="homeheader_left">
                <div className="section_title">¿QUÉ ES ESTO?</div>
                <div className="text">...</div>
            </div>

            {/* Le conteneur change de comportement si une carte est sélectionnée */}
            <div className={`fancy_cards ${selectedSlug ? 'has-selected' : ''}`}>

                {/* Le titre se cache en CSS si has-selected est présent */}
                <div className="toptitle">¿EN QUÉ MOMENTO TE ENCUENTRAS?</div>

                <div className="fancy_cards_wr">

                    {/* Section Liste des cartes */}
                    <div className="cards_list_container">
                        {CARDS_DATA.map((card) => {
                            const isSelected = selectedSlug === card.slug;
                            return (
                                <div
                                    key={card.id}
                                    className={`fancy_card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => setSelectedSlug(isSelected ? null : card.slug)}
                                >
                                    <div className="content">
                                        <div className="basebg" style={{ backgroundColor: card.color }}></div>
                                        <div className="info">
                                            <div className="name">{card.name}</div>
                                            <div className="num">
                                                <div className="bg" style={{ backgroundColor: card.color }}></div>
                                                {card.id}
                                            </div>
                                            <div className="lateral_phrase">{card.phrase}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Panneau de détails dynamique */}
                    {selectedSlug && selectedCard && (
                        <div className="fancydetail_wr active">
                            <div className="close_fancydetail" onClick={() => setSelectedSlug(null)}></div>

                            <div className="content">
                                {SUB_LINKS_DATA[selectedSlug]?.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={`card_i ${link.isPodcast ? 'podcast' : ''}`}
                                        style={{ backgroundColor: selectedCard.color }} // La couleur s'adapte à la carte !
                                    >
                                        <div className="info">
                                            <div className="title">{link.title}</div>
                                            <div className="icon"></div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="gridbg"></div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}