// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ProjectIndicators from './components/ProjectIndicators';
import InterestingPages from './components/InterestingPages';
import HowItWorks from './components/HowItWorks';
import InteractiveMap from './components/InteractiveMap';
import Footer from './components/Footer';

import Login from './components/Login';
import NavbarLogin from './components/NavbarLogin';
import FormDependencia from './components/FormDependencia';
import TableComponent from './components/TableComponent';
import CRUDTable from './components/CRUDTable';
import PrivateRoute from './components/PrivateRoute'; // Importa el componente de ruta privada

const MainContent = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <About />
            <ProjectIndicators />
            <InterestingPages />
            <HowItWorks />
            <InteractiveMap />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/dependencia/*" element={<DependenciaLayout />} />
                <Route path="/login/*" element={<LoginLayout />} />
                <Route path="/table" element={<TableLayout />} />
                <Route path="/crud" element={<PrivateRoute><CRUDTable /></PrivateRoute>} /> {/* Usa la ruta privada */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

const DependenciaLayout = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<FormDependencia />} />
            </Routes>
        </div>
    );
};

const LoginLayout = () => {
    return (
        <div>
            <NavbarLogin />
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    );
};

const TableLayout = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<TableComponent />} />
            </Routes>
        </div>
    );
};

export default App;
