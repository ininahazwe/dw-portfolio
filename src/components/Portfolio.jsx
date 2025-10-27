import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/projects';
import './Portfolio.css';

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleClose = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="portfolio-container">
            {/* Logo central fixe */}
            <div className="portfolio-logo">
                <div className="portfolio-logo-title">PORTFOLIO</div>
                <div className="portfolio-logo-subtitle">AVRIL — OCTOBRE 2025</div>
            </div>

            {/* Grille de catégories avec animation de sortie */}
            <AnimatePresence>
                {!selectedCategory && (
                    <Motion.div
                        className="categories-grid-container"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -1000 }}
                        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    >
                        <div className="categories-grid">
                            {categories.map((category, index) => {
                                const IconComponent = category.icon;
                                return (
                                    <Motion.button
                                        key={category.id}
                                        className="category-card"
                                        onClick={() => handleCategoryClick(category)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                    >
                                        {/* Icône à gauche (moitié dehors) */}
                                        <div className="category-icon" style={{ color: category.color }}>
                                            <IconComponent size={44} strokeWidth={1.2} />
                                        </div>

                                        {/* Contenu */}
                                        <div className="category-content">
                                            <h3 className="category-title">{category.title}</h3>
                                            <div className="category-count">
                                                {category.projects.length} PROJET{category.projects.length > 1 ? 'S' : ''}
                                            </div>
                                        </div>
                                    </Motion.button>
                                );
                            })}
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>

            {/* Modal qui monte depuis le bas */}
            <AnimatePresence>
                {selectedCategory && (
                    <Motion.div
                        className="modal-overlay"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    >
                        <div className="modal-content">
                            {/* En-tête */}
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    {React.createElement(selectedCategory.icon, {
                                        size: 36,
                                        strokeWidth: 1.2,
                                        style: { color: selectedCategory.color }
                                    })}
                                    <h2 className="modal-title">{selectedCategory.title}</h2>
                                </div>
                                <button onClick={handleClose} className="modal-close-btn">
                                    FERMER ✕
                                </button>
                            </div>

                            {/* Liste des projets */}
                            <div className="projects-list">
                                {selectedCategory.projects.map((project, index) => (
                                    <Motion.div
                                        key={index}
                                        className="project-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                    >
                                        <h3 className="project-name">{project.name}</h3>
                                        <p className="project-description">{project.description}</p>

                                        <div className="project-metadata">
                                            {project.tech && (
                                                <div className="metadata-item">
                                                    <span className="metadata-label">Technologies:</span>
                                                    <span className="metadata-value">{project.tech.join(', ')}</span>
                                                </div>
                                            )}

                                            {project.period && (
                                                <div className="metadata-item">
                                                    <span className="metadata-label">Période:</span>
                                                    <span className="metadata-value">{project.period}</span>
                                                </div>
                                            )}

                                            {project.metrics && (
                                                <div className="metadata-item">
                                                    <span className="metadata-label">Résultats:</span>
                                                    <span className="metadata-value">{project.metrics}</span>
                                                </div>
                                            )}
                                        </div>
                                    </Motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button onClick={handleClose} className="modal-back-btn">
                                    RETOUR AUX CATÉGORIES
                                </button>
                            </div>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;