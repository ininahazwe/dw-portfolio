import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import { DataProvider } from './data/DataProvider.jsx'
import Portfolio from "./components/Portfolio.jsx";
import HomeV1 from "./pages/HomeV1.jsx";
import Home from "./pages/Home.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DataProvider><App /></DataProvider>} />
                <Route path="/apr-oct25" element={<Portfolio />} />
                <Route path="/v1" element={<HomeV1 />} />
                <Route path="/v2" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)