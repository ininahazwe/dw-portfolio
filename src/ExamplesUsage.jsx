import React, { useState } from 'react';
import ConstructionAnimationLottie from './components/ConstructionAnimationLottie.jsx';

/**
 * Exemples d'utilisation du composant ConstructionAnimationLottie
 * Décommente l'exemple que tu veux voir
 */

// ============================================
// EXEMPLE 1: Utilisation basique
// ============================================
export function BasicExample() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Utilisation basique</h2>
            <ConstructionAnimationLottie width={900} height={606} />
        </div>
    );
}

// ============================================
// EXEMPLE 2: Avec contrôles (pause/reprendre)
// ============================================
export function ControlledExample() {
    const [isAnimating, setIsAnimating] = useState(true);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Animation avec contrôles</h2>

            <div style={{ marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: isAnimating ? '#e74c3c' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}
                >
                    {isAnimating ? '⏸ Pause' : '▶ Reprendre'}
                </button>
            </div>

            {isAnimating && <ConstructionAnimationLottie width={900} height={606} />}

            {!isAnimating && (
                <div style={{
                    backgroundColor: '#f5f5f5',
                    padding: '2rem',
                    textAlign: 'center',
                    borderRadius: '8px',
                    color: '#999'
                }}>
                    Animation en pause - Clique sur le bouton pour reprendre
                </div>
            )}
        </div>
    );
}

// ============================================
// EXEMPLE 3: Hero section
// ============================================
export function HeroSectionExample() {
    return (
        <section
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4rem 2rem',
                backgroundColor: '#f9f9f9',
                gap: '3rem'
            }}
        >
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1f1f1f' }}>
                    Construisons votre projet digital
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
                    De la conception à la réalisation, nous transformons vos idées en produits
                    innovants avec expertise technique et créativité.
                </p>
                <button
                    style={{
                        padding: '1rem 2rem',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Démarrer un projet
                </button>
            </div>

            <div style={{ flex: 1 }}>
                <ConstructionAnimationLottie width={600} height={400} />
            </div>
        </section>
    );
}

// ============================================
// EXEMPLE 4: Grid de services
// ============================================
export function ServiceGridExample() {
    const services = [
        {
            title: 'Développement',
            description: 'Création de solutions digitales robustes et performantes'
        },
        {
            title: 'Design',
            description: 'Interfaces modernes et expérience utilisateur optimale'
        },
        {
            title: 'Déploiement',
            description: 'Mise en production et maintenance continue'
        }
    ];

    return (
        <div style={{ padding: '4rem 2rem', backgroundColor: '#fff' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
                Nos services
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {services.map((service, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ height: '200px' }}>
                            <ConstructionAnimationLottie width={350} height={200} />
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                                {service.title}
                            </h3>
                            <p style={{ color: '#666' }}>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// EXEMPLE 5: Responsive (mobile-friendly)
// ============================================
export function ResponsiveExample() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Version responsive</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
                {isMobile ? '📱 Vue mobile' : '🖥 Vue desktop'}
            </p>

            <div
                style={{
                    maxWidth: isMobile ? '100%' : '900px',
                    margin: '0 auto',
                    padding: isMobile ? '0' : '2rem',
                    backgroundColor: isMobile ? '#fff' : '#f9f9f9',
                    borderRadius: isMobile ? '0' : '12px'
                }}
            >
                <ConstructionAnimationLottie
                    width={isMobile ? 300 : 900}
                    height={isMobile ? 202 : 606}
                />
            </div>
        </div>
    );
}

// ============================================
// EXEMPLE 6: Dashboard/Landing page complète
// ============================================
export function FullPageExample() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <header style={{
                padding: '2rem',
                borderBottom: '1px solid #e0e0e0',
                textAlign: 'center'
            }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Mon Entreprise Tech</h1>
                <p style={{ color: '#666' }}>Transformons vos idées en réalité</p>
            </header>

            {/* Hero Section */}
            <section style={{
                padding: '4rem 2rem',
                backgroundColor: '#f9f9f9',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                    Processus de développement
                </h2>
                <ConstructionAnimationLottie width={800} height={500} />
            </section>

            {/* Features Section */}
            <section style={{ padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Nos avantages</h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { icon: '⚙️', title: 'Techniques', text: 'Stack moderne et performances optimales' },
                            { icon: '🎨', title: 'Design', text: 'Interfaces belles et intuitives' },
                            { icon: '🚀', title: 'Scalabilité', text: 'Solutions qui grandissent avec vous' },
                            { icon: '🔒', title: 'Sécurité', text: 'Protection maximale de vos données' }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: '1.5rem',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '4rem 2rem',
                backgroundColor: '#3498db',
                color: 'white',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    Prêt à démarrer votre projet ?
                </h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Contactez-nous aujourd'hui pour une consultation gratuite
                </p>
                <button style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'white',
                    color: '#3498db',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Demander un devis
                </button>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '2rem',
                backgroundColor: '#1f1f1f',
                color: 'white',
                textAlign: 'center',
                fontSize: '0.9rem'
            }}>
                <p>&copy; 2024 Mon Entreprise. Tous droits réservés.</p>
            </footer>
        </div>
    );
}

// ============================================
// EXEMPLE PRINCIPAL (décommente l'un des exemples)
// ============================================
export default function App() {
    // Décommente un seul exemple à la fois :

    // return <BasicExample />;
    // return <ControlledExample />;
    // return <HeroSectionExample />;
    // return <ServiceGridExample />;
    // return <ResponsiveExample />;
    return <FullPageExample />;
}