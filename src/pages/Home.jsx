import { useState } from 'react';
import { timelinePeriods, colorPalettes } from '../data/timelinePeriods';
import '../styles/Home.css';

// Étape 1 : structure de la page — 1/4 explorateur (timeline) + 3/4 grille de projets.
function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const period = timelinePeriods[activeIndex];
    const color = colorPalettes[activeIndex] ?? colorPalettes[0];

    const projects = period.categories.flatMap(cat =>
        cat.projects.map(p => ({ ...p, category: cat.name }))
    );

    return (
        <div className="home-layout">
            <aside className="home-explorer">
                <div className="pane-title">Explorateur</div>
                <ol className="explorer-timeline">
                    {timelinePeriods.map((p, idx) => (
                        <li
                            key={p.id}
                            className={`explorer-period ${idx === activeIndex ? 'active' : ''}`}
                            style={{ '--dot': (colorPalettes[idx] ?? colorPalettes[0]).accent }}
                        >
                            <button onClick={() => setActiveIndex(idx)}>
                                <div className="explorer-period-title">{p.title}</div>
                                <div className="explorer-period-sub">{p.subtitle}</div>
                            </button>
                        </li>
                    ))}
                </ol>
            </aside>

            <main className="home-main">
                <div className="pane-title" style={{ color: color.dark }}>
                    Projets — {period.title}
                </div>
                <div className="projects-grid">
                    {projects.map(project => (
                        <article key={project.name} className="grid-card">
                            <div className="grid-card-cat">{project.category}</div>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
