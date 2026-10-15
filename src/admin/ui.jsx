// Briques d'interface communes aux écrans d'administration.

export function Field({ label, hint, className = '', children }) {
    return (
        <label className={`ad-field ${className}`}>
            <span className="ad-label">{label}</span>
            {children}
            {hint && <small className="ad-hint">{hint}</small>}
        </label>
    );
}

export function Toast({ toast }) {
    if (!toast) return null;
    return <div className={`ad-toast is-${toast.type}`} role="status">{toast.text}</div>;
}
