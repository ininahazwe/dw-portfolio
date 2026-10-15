import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { auth, loadAll } from '../admin/api';
import { explain } from '../admin/util';
import { Toast } from '../admin/ui';
import Login from '../admin/Login';
import ProjectsPanel from '../admin/ProjectsPanel';
import { PeriodsPanel, CategoriesPanel } from '../admin/RecordPanels';
import '../styles/workspace.css';
import '../styles/admin.css';

const TABS = [
    { id: 'projects', label: 'Projets' },
    { id: 'periods', label: 'Périodes' },
    { id: 'categories', label: 'Catégories' },
];

function Dashboard() {
    const [tab, setTab] = useState('projects');
    const [data, setData] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!toast) return undefined;
        const id = setTimeout(() => setToast(null), 5000);
        return () => clearTimeout(id);
    }, [toast]);

    const refresh = useCallback(async () => { setData(await loadAll()); }, []);
    useEffect(() => { refresh().catch(e => setToast({ type: 'error', text: explain(e) })); }, [refresh]);

    const panelProps = { data, refresh, notify: setToast };

    return (
        <div className="ws ad">
            <header className="ad-top">
                <span className="ad-brand">Admin</span>
                <nav className="ad-tabs" aria-label="Sections">
                    {TABS.map(t => (
                        <button key={t.id} className={`ad-tab ${tab === t.id ? 'is-on' : ''}`} onClick={() => setTab(t.id)}>
                            {t.label}
                        </button>
                    ))}
                </nav>
                <Link className="ad-top-link" to="/" target="_blank"><ExternalLink size={15} strokeWidth={1.6} />Voir le site</Link>
                <button className="ws-circle ws-circle--ghost" onClick={() => auth.signOut()} title="Se déconnecter" aria-label="Se déconnecter">
                    <LogOut size={16} strokeWidth={1.6} />
                </button>
            </header>

            {!data ? <p className="ad-loading">Chargement…</p> : (
                <>
                    {tab === 'projects' && <ProjectsPanel {...panelProps} />}
                    {tab === 'periods' && <PeriodsPanel {...panelProps} />}
                    {tab === 'categories' && <CategoriesPanel {...panelProps} />}
                </>
            )}
            <Toast toast={toast} />
        </div>
    );
}

export default function Admin() {
    const [state, setState] = useState({ status: 'loading', userId: null });

    // Page privée : pas d'indexation par les moteurs de recherche
    useEffect(() => {
        const previous = document.title;
        document.title = 'Admin — My journey at MFWA';
        const meta = document.createElement('meta');
        meta.name = 'robots'; meta.content = 'noindex';
        document.head.appendChild(meta);
        return () => { document.title = previous; meta.remove(); };
    }, []);

    useEffect(() => {
        if (!supabase) return undefined;
        let alive = true;
        const resolve = async (session) => {
            let next = { status: 'anon', userId: null };
            if (session) {
                try { next = { status: (await auth.isAdmin(session.user.id)) ? 'admin' : 'denied', userId: session.user.id }; }
                catch { next = { status: 'denied', userId: session.user.id }; }
            }
            if (alive) setState(prev => (prev.status === next.status && prev.userId === next.userId ? prev : next));
        };
        // Ne pas appeler Supabase directement dans le callback (risque de blocage) : on diffère.
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (['INITIAL_SESSION', 'SIGNED_IN', 'SIGNED_OUT'].includes(event)) setTimeout(() => resolve(session), 0);
        });
        return () => { alive = false; data.subscription.unsubscribe(); };
    }, []);

    if (!supabase) {
        return (
            <div className="ws ad"><div className="ad-center"><div className="ad-login">
                <h1>Supabase non configuré</h1>
                <p>Renseigne <code>NEXT_PUBLIC_SUPABASE_URL</code> et <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> (dans <code>.env.local</code> en local, dans Vercel en production).</p>
            </div></div></div>
        );
    }
    if (state.status === 'loading') return <div className="ws ad"><p className="ad-loading">Chargement…</p></div>;
    if (state.status === 'anon') return <div className="ws ad"><Login /></div>;
    if (state.status === 'denied') {
        return (
            <div className="ws ad"><div className="ad-center"><div className="ad-login">
                <h1>Accès refusé</h1>
                <p>Ce compte n&apos;est pas administrateur du portfolio.</p>
                <button className="ad-btn ad-btn--dark ad-btn--wide" onClick={() => auth.signOut()}>Se déconnecter</button>
            </div></div></div>
        );
    }
    return <Dashboard />;
}
