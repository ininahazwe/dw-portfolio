import React, { useState, useEffect } from 'react';
import { timelinePeriods, colorPalettes } from '../data/timelinePeriods';
import '../styles/TimelinePortfolio.css';

const TimelinePortfolio = () => {
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
    const [onDetailPage, setOnDetailPage] = useState(false);
    const [categoryExpanded, setCategoryExpanded] = useState({});

    const currentPeriod = timelinePeriods[currentPeriodIndex];
    const currentColor = colorPalettes[currentPeriodIndex];

    // Gérer l'expansion/fermeture des catégories au changement de période
    useEffect(() => {
        setCategoryExpanded({});
    }, [currentPeriodIndex]);

    // Gérer les variables CSS dynamiques
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--current-primary', currentColor.primary);
        root.style.setProperty('--current-accent', currentColor.accent);
        root.style.setProperty('--current-dark', currentColor.dark);
        root.style.setProperty('--current-light', currentColor.light);
    }, [currentColor]);

    const toggleCategory = (categoryName) => {
        setCategoryExpanded(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    const handlePeriodChange = (index) => {
        setCurrentPeriodIndex(index);
    };

    return (
        <div className="timeline-portfolio-wrapper">
            {/* LANDING PAGE */}
            {!onDetailPage && (
                <div className="landing-page">
                    {/* Timeline */}
                    <div className="timeline-header">
                        {timelinePeriods.map((period, idx) => (
                            <div
                                key={period.id}
                                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                            >
                                <button
                                    className={`timeline-dot ${
                                        currentPeriodIndex === idx ? 'active' : ''
                                    }`}
                                    onClick={() => handlePeriodChange(idx)}
                                    aria-label={`Period ${idx + 1}: ${period.title}`}
                                    style={{
                                        backgroundColor:
                                            currentPeriodIndex === idx
                                                ? colorPalettes[idx].accent
                                                : '#D3D1C7'
                                    }}
                                />
                                {idx < timelinePeriods.length - 1 && (
                                    <div
                                        className={`timeline-connector ${
                                            currentPeriodIndex > idx ? 'active' : ''
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Main Card */}
                    <div
                        className="period-card"
                        style={{ backgroundColor: currentColor.primary }}
                    >
                        {/* Period Label */}
                        <div
                            className="period-label"
                            style={{ color: currentColor.dark }}
                        >
                            {currentPeriod.startDate} — {currentPeriod.endDate}
                        </div>

                        {/* Title & Subtitle */}
                        <h1
                            className="period-title"
                            style={{ color: currentColor.dark }}
                        >
                            {currentPeriod.title}
                        </h1>

                        <h2
                            className="period-subtitle"
                            style={{ color: currentColor.dark }}
                        >
                            {currentPeriod.subtitle}
                        </h2>

                        {/* Description */}
                        <p
                            className="period-description"
                            style={{ color: currentColor.dark }}
                        >
                            {currentPeriod.description}
                        </p>

                        {/* Highlights */}
                        <div className="period-highlights">
                            {currentPeriod.highlights.map((highlight, idx) => (
                                <div
                                    key={idx}
                                    className="highlight-item"
                                    style={{ color: currentColor.dark }}
                                >
                                    <span className="highlight-dot">•</span>
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>

                        {/* Continue Reading Button */}
                        <button
                            className="continue-reading-btn"
                            onClick={() => setOnDetailPage(true)}
                            style={{ backgroundColor: currentColor.accent }}
                        >
                            Continue Reading →
                        </button>
                    </div>

                    {/* Navigation Hint */}
                    <div className="navigation-hint">
                        Click on the timeline dots to navigate between periods
                    </div>
                </div>
            )}

            {/* DETAIL PAGE */}
            {onDetailPage && (
                <div className="detail-page">
                    {/* Sticky Header */}
                    <header className="detail-header">
                        {/* Minimaliste Timeline */}
                        <div className="header-timeline">
                            {timelinePeriods.map((period, idx) => (
                                <div
                                    key={period.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    <button
                                        className={`header-timeline-dot ${
                                            currentPeriodIndex === idx ? 'active' : ''
                                        }`}
                                        onClick={() => handlePeriodChange(idx)}
                                        aria-label={`Period ${idx + 1}`}
                                        style={{
                                            backgroundColor:
                                                currentPeriodIndex === idx
                                                    ? colorPalettes[idx].accent
                                                    : 'transparent',
                                            borderColor:
                                                currentPeriodIndex === idx
                                                    ? colorPalettes[idx].accent
                                                    : '#D3D1C7'
                                        }}
                                    />
                                    {idx < timelinePeriods.length - 1 && (
                                        <div className="header-connector" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            className="back-button"
                            onClick={() => setOnDetailPage(false)}
                        >
                            ← Back
                        </button>
                    </header>

                    {/* Content */}
                    <div className="detail-content">
                        <h1 className="detail-title">{currentPeriod.title}</h1>

                        <p className="detail-description">{currentPeriod.description}</p>

                        {/* Projects by Category */}
                        {currentPeriod.categories.map((category, categoryIdx) => (
                            <div
                                key={categoryIdx}
                                className="category-section"
                                style={{
                                    animation: `slideUp 0.4s ease-out ${categoryIdx * 0.1}s both`
                                }}
                            >
                                <h2
                                    className="category-title"
                                    style={{
                                        borderBottomColor: currentColor.accent,
                                        color: currentColor.dark
                                    }}
                                >
                                    {category.name}
                                </h2>

                                <div className="category-projects">
                                    {category.projects.map((project, projectIdx) => (
                                        <div
                                            key={projectIdx}
                                            className="project-item"
                                            style={{
                                                borderLeftColor: currentColor.accent,
                                                animation: `slideUp 0.4s ease-out ${
                                                    (categoryIdx * 0.1 + projectIdx * 0.05)
                                                }s both`
                                            }}
                                        >
                                            <h3 className="project-title">{project.name}</h3>

                                            <p className="project-description">
                                                {project.description}
                                            </p>

                                            <div className="project-metadata">
                                                <div className="metadata-badge">
                                                    <span>📅</span>
                                                    <span>{project.period}</span>
                                                </div>

                                                {project.tech && (
                                                    <div className="metadata-badge">
                                                        <span>🛠️</span>
                                                        <span>{project.tech.join(', ')}</span>
                                                    </div>
                                                )}

                                                {project.metrics && (
                                                    <div className="metadata-badge">
                                                        <span>📊</span>
                                                        <span>{project.metrics}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelinePortfolio;