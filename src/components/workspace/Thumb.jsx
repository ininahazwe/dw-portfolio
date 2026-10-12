// Pastille ronde d'un projet : sa première image, sinon l'icône de sa catégorie.
// fallback="initials" : initiales du projet au lieu de l'icône de catégorie.
const initials = (t) => t.split(/\s+/).filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0]).join('').toUpperCase();

export default function Thumb({ project, size = 44, className = '', fallback = 'icon' }) {
    const Icon = project.category.icon;
    const cover = project.images[0]?.src;
    let content = null;
    if (cover) content = <img src={cover} alt="" loading="lazy" decoding="async" />;
    else if (fallback === 'initials') content = <b style={{ fontSize: Math.round(size * 0.34) }}>{initials(project.title)}</b>;
    else if (Icon) content = <Icon size={Math.round(size * 0.42)} strokeWidth={1.6} />;
    return (
        <span className={`ws-thumb ${!cover && fallback === 'initials' ? 'ws-thumb--initials' : ''} ${className}`}
              style={{ width: size, height: size }}>
            {content}
        </span>
    );
}
