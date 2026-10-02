import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import Portfolio from "./components/Portfolio.jsx";
import HomeV1 from "./pages/HomeV1.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/apr-oct25" element={<Portfolio />} />
                <Route path="/v1" element={<HomeV1 />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)