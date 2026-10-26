import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import { DataProvider } from './data/DataProvider.jsx'
import Portfolio from "./components/Portfolio.jsx";
import HomeV1 from "./pages/HomeV1.jsx";

// Page d'administration chargée à la demande : elle n'alourdit pas le site public
const Admin = lazy(() => import('./pages/Admin.jsx'))

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Layout partagé : la page ne se remonte pas quand on ouvre/ferme un projet (/project/<id>) */}
                <Route element={<DataProvider><App /><Outlet /></DataProvider>}>
                    <Route path="/" element={null} />
                    <Route path="/project/:id" element={null} />
                </Route>
                <Route path="/apr-oct25" element={<Portfolio />} />
                <Route path="/v1" element={<HomeV1 />} />
                <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)