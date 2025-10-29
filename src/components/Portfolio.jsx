import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/projects';
import { ArrowUp } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        const saved = localStorage.getItem('portfolioMenuOpen');
        return saved ? JSON.parse(saved) : false;
    });
    const [activeSection, setActiveSection] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Palette de couleurs pour les gradients
    const gradientColors = {
        dev: { center: 'rgba(210, 212, 157, 0.25)', corner: 'rgba(210, 212, 157, 0.10)' },
        design: { center: 'rgba(255, 89, 94, 0.25)', corner: 'rgba(255, 89, 94, 0.10)' },
        translation: { center: 'rgba(255, 202, 58, 0.25)', corner: 'rgba(255, 202, 58, 0.10)' },
        analytics: { center: 'rgba(138, 201, 38, 0.25)', corner: 'rgba(138, 201, 38, 0.10)' },
        video: { center: 'rgba(25, 130, 196, 0.25)', corner: 'rgba(25, 130, 196, 0.10)' },
        project: { center: 'rgba(106, 76, 147, 0.25)', corner: 'rgba(106, 76, 147, 0.10)' },
        audit: { center: 'rgba(255, 159, 28, 0.25)', corner: 'rgba(255, 159, 28, 0.10)' },
        tools: { center: 'rgba(46, 196, 182, 0.25)', corner: 'rgba(46, 196, 182, 0.10)' },
    };

    const currentGradient = gradientColors[activeSection] || gradientColors.dev;

    // Persister l'état du menu
    useEffect(() => {
        localStorage.setItem('portfolioMenuOpen', JSON.stringify(isMenuOpen));
    }, [isMenuOpen]);

    // Gérer le scroll pour activer le bouton "scroll to top" et highlighter le menu
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);

            // Déterminer la section active
            categories.forEach((category) => {
                const element = document.getElementById(`section-${category.id}`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom > 100) {
                        setActiveSection(category.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCategoryClick = (categoryId) => {
        setActiveSection(categoryId);
        const element = document.getElementById(`section-${categoryId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="portfolio-container">
            {/* Div fixe avec gradients en arrière-plan */}
            {isMenuOpen && (
                <Motion.div
                    className="gradient-background"
                    animate={{
                        backgroundImage: `
                            radial-gradient(ellipse 600px 400px at 110% 0%, ${currentGradient.center} 0%, transparent 60%),
                            radial-gradient(ellipse 400px 600px at 10% 90%, ${currentGradient.corner} 0%, transparent 65%)
                        `,
                    }}
                    transition={{ duration: 0.6 }}
                />
            )}

            {/* Menu latéral */}
            <AnimatePresence>
                {isMenuOpen && (
                    <Motion.nav
                        className="sidebar-menu"
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ul className="menu-list">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`menu-item ${activeSection === category.id ? 'active' : ''}`}
                                    >
                                        {category.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Motion.nav>
                )}
            </AnimatePresence>

            {/* Grille initiale */}
            <AnimatePresence>
                {!isMenuOpen && (
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
                                        onClick={() => setIsMenuOpen(true)}
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

            {/* Contenu principal avec sections */}
            {isMenuOpen && (
                <div className="main-content">
                    {categories.map((category, categoryIndex) => (
                        <section
                            key={category.id}
                            id={`section-${category.id}`}
                            className="content-section"
                        >
                            <Motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <h2 className="section-title">{category.title}</h2>

                                <div className="projects-container">
                                    {category.projects.map((project, projectIndex) => (
                                        <Motion.div
                                            key={projectIndex}
                                            className="project-subsection"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: projectIndex * 0.05,
                                                duration: 0.4
                                            }}
                                            viewport={{ once: false, amount: 0.2 }}
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
                            </Motion.div>
                        </section>
                    ))}
                </div>
            )}

            {/* Bouton "Revenir en haut" */}
            <AnimatePresence>
                {showScrollTop && (
                    <Motion.button
                        className="scroll-to-top"
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowUp size={20} />
                    </Motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;