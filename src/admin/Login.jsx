import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { auth } from './api';
import { explain } from './util';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true); setError('');
        try { await auth.signIn(email.trim(), password); }
        catch (err) { setError(explain(err)); setBusy(false); }
        // en cas de succès, la page détecte la session et prend le relais
    };

    return (
        <div className="ad-center">
            <form className="ad-login" onSubmit={submit}>
                <span className="ad-login-mark">Y<i /></span>
                <h1>Administration</h1>
                <p>Connecte-toi pour gérer les projets du portfolio.</p>
                <label className="ad-field">
                    <span className="ad-label">Email</span>
                    <input className="ad-input" type="email" autoComplete="username" required autoFocus
                           value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className="ad-field">
                    <span className="ad-label">Mot de passe</span>
                    <input className="ad-input" type="password" autoComplete="current-password" required
                           value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {error && <p className="ad-error" role="alert">{error}</p>}
                <button className="ad-btn ad-btn--dark ad-btn--wide" disabled={busy}>
                    {busy ? 'Connexion…' : 'Se connecter'}<ArrowRight size={17} strokeWidth={1.7} />
                </button>
            </form>
        </div>
    );
}
