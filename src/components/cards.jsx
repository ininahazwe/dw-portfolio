import React from 'react';

// Si tu as besoin d'un fichier CSS dédié comme dans ton exemple :
import '../styles/card.css';

const SUB_LINKS_DATA = [
    {
        id: 'tengo-un-problema-en-el-corazon',
        name: 'Tengo un problema en el corazón',
        title: 'El corazón',
        avatarUrl: 'https://guiacirugiacardiaca.com/wp-content/uploads/2021/12/GRE_HOME_Corazon_Color.svg',
        totalScore: '8.8',
        profileUrl: '/guia/tengo-un-problema-en-el-corazon/',
        isPodcast: false,
        scores: [
            { label: 'UI', val: '8.7' },
            { label: 'UX', val: '8.7' },
            { label: 'INN', val: '9' }
        ]
    },
    {
        id: 'bienvenido-a-la-guia-sonora',
        name: 'Bienvenido a la guía de cirugía cardiaca',
        title: 'Historia Sonora',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
        totalScore: '8.5',
        profileUrl: 'https://open.acast.com/public/streams/62b098b418ccdd00129dd1f3/episodes/62b098b95d938d00157299b8.mp3',
        isPodcast: true,
        scores: [
            { label: 'UI', val: '8.5' },
            { label: 'UX', val: '8.5' },
            { label: 'AUD', val: '9.0' }
        ]
    },
    {
        id: 'antes-de-la-cirugia',
        name: 'Antes de la cirugía cardíaca',
        title: 'Preparación',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
        totalScore: '8.2',
        profileUrl: '/guia/antes-de-la-cirugia/',
        isPodcast: false,
        scores: [
            { label: 'UI', val: '8.2' },
            { label: 'UX', val: '8.3' },
            { label: 'INN', val: '8.1' }
        ]
    }
];

// Exemple de composant calqué sur ton JudgesSection pour afficher ces liens
export const Cards = () => {
    return (
        <section className="sublinks">
            <div className="container">
                <div className="sublinks__wrapper">

                    <header className="sublinks__header">
                        <h3 className="sublinks__score">8.50</h3>
                        <h5 className="sublinks__subtitle">Media de Contenidos</h5>
                    </header>

                    <ul className="sublinks__list">
                        {SUB_LINKS_DATA.map((item) => (
                            <li key={item.id} className="sublink-card">
                                <div className="sublink-card__wrapper">

                                    <a href={item.profileUrl} className="sublink-card__link" aria-label={`Link ${item.name}`} />

                                    <div className="sublink-card__total-score">{item.totalScore}</div>

                                    <div className="sublink-card__info">

                                        <div className="sublink-card__avatar-container">
                                            <img
                                                src={item.avatarUrl}
                                                alt={item.name}
                                                className="sublink-card__avatar"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="sublink-card__meta">
                                            <h4 className="sublink-card__name">{item.name}</h4>
                                            <h6 className="sublink-card__title">{item.title} {item.isPodcast && '🎙️'}</h6>
                                        </div>

                                        <ul className="sublink-card__score-metrics">
                                            {item.scores.map((score, idx) => (
                                                <li key={idx} className="sublink-card__score__item">
                                                    <span className="sublink-card__score__label">{score.label}</span>
                                                    <span className="sublink-card__score__val">{score.val}</span>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </section>
    );
};