import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/projects';
import { ArrowUp } from 'lucide-react';
import ImageGallery from './ImageGallery';
import './Portfolio.css';
import { div } from 'framer-motion/client';

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        const saved = localStorage.getItem('portfolioMenuOpen');
        return saved ? JSON.parse(saved) : false;
    });
    const [activeSection, setActiveSection] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Palette de couleurs pour les gradients
    const gradientColors = {
        dev: { 
            center: 'rgba(132, 0, 130, 0.20)',
            full: 'rgb(132, 0, 130)', 
            corner: 'rgba(132, 0, 130, 0.10)' 
        },
        visual: { 
            center: 'rgba(245, 202, 195, 0.18)', 
            full: 'rgb(245, 202, 19)',
            corner: 'rgba(245, 202, 195, 0.08)' 
        },
        translation: { 
            center: 'rgba(132, 165, 157, 0.18)', 
            full: 'rgb(132, 165, 157)',
            corner: 'rgba(132, 165, 157, 0.08)' 
        },
        analytics: { 
            center: 'rgba(242, 132, 130, 0.18)', 
            full: 'rgb(242, 132, 130)',
            corner: 'rgba(242, 132, 130, 0.08)' 
        },
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
        <div className="portfolio-wrapper">
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

                {/* Paragraphe introductif */}
                <AnimatePresence>
                    {!isMenuOpen && (
                        <Motion.div
                            className="intro-paragraph-container"
                            initial={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -1000 }}
                            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                        >
                            <p className="intro-paragraph">
                                Since last April, my work at MFWA has taken me across diverse disciplines, from crafting{' '}
                                <Motion.button
                                    className="keyword-link"
                                    onClick={() => setIsMenuOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ color: gradientColors['dev'].full }}
                                >
                                    digital solutions
                                </Motion.button>{' '}
                                and designing compelling{' '}
                                <Motion.button
                                    className="keyword-link"
                                    onClick={() => setIsMenuOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ color: gradientColors['visual'].full }}
                                >
                                    visual communication
                                </Motion.button>
                                , to delivering precision in{' '}
                                <Motion.button
                                    className="keyword-link"
                                    onClick={() => setIsMenuOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ color: gradientColors['translation'].full }}
                                >
                                    translation and content writing
                                </Motion.button>
                                , all while managing great projects through{' '}
                                <Motion.button
                                    className="keyword-link"
                                    onClick={() => setIsMenuOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ color: gradientColors['analytics'].full }}
                                >
                                    analytics and strategic oversight
                                </Motion.button>
                                . Each endeavor reflects a commitment to transforming ideas into impactful outcomes that enhance work life through digitalization.
                            </p>
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

                                    {category.gallery && (
                                        <Motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: false, amount: 0.1 }}
                                            style={{ marginBottom: '3rem' }}
                                        >
                                            <ImageGallery images={category.gallery} />
                                        </Motion.div>
                                    )}

                                    {category.projects && category.projects.length > 0 && (
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
                                    )}
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
        </div>
    );
};

export default Portfolio;