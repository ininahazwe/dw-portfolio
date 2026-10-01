import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/animation.json';

/**
 * ConstructionAnimationWithLottie
 * Composant React utilisant lottie-react pour afficher l'animation Lottie originale
 *
 * Cette version affiche l'animation EXACTE du fichier JSON Lottie (321 KB)
 * Animation fluide de construction/développement avec des éléments animés
 *
 * Props:
 * - loop: bool (default: true) - Boucle infinie
 * - autoplay: bool (default: true) - Démarre automatiquement
 * - speed: number (default: 1) - Vitesse: 0.5 = 2x plus lent, 1 = normal, 2 = 2x plus rapide
 * - width: string ou number (default: '100%') - Largeur du conteneur
 * - height: string ou number (default: 'auto') - Hauteur du conteneur
 *
 * Installation:
 * npm install lottie-react
 *
 * Structure du projet:
 * src/
 * ├── components/
 * │   ├── ConstructionAnimationWithLottie.jsx (ce fichier)
 * │   └── animation.json (fichier fourni)
 * └── ...
 */

export default function ConstructionAnimationWithLottie({
                                                            loop = true,
                                                            autoplay = true,
                                                            speed = 1,
                                                            width = '100%',
                                                            height = 'auto',
                                                        }) {
    return (
        <div
            style={{
                width,
                height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Lottie
                animationData={animationData}
                loop={loop}
                autoplay={autoplay}
                speed={speed}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}

/**
 * Exemple d'utilisation avec contrôles
 */
export function ConstructionAnimationWithControls() {
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [speed, setSpeed] = React.useState(1);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: isPlaying ? '#e74c3c' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                    }}
                >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label htmlFor="speed-slider" style={{ fontSize: '0.9rem', color: '#666' }}>
                        Vitesse:
                    </label>
                    <input
                        id="speed-slider"
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.25"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        style={{ width: '120px' }}
                    />
                    <span style={{ fontSize: '0.9rem', minWidth: '30px' }}>{speed.toFixed(2)}x</span>
                </div>
            </div>

            <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                {isPlaying ? (
                    <ConstructionAnimationWithLottie speed={speed} />
                ) : (
                    <div
                        style={{
                            backgroundColor: '#f5f5f5',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            color: '#999',
                            minHeight: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Animation en pause
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Responsive version
 */
export function ConstructionAnimationResponsive() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                maxWidth: isMobile ? '100%' : '900px',
                margin: '0 auto',
                padding: isMobile ? '1rem' : '2rem',
            }}
        >
            <ConstructionAnimationWithLottie
                width={isMobile ? '100%' : '900px'}
                height={isMobile ? '300px' : '606px'}
            />
        </div>
    );
}