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
import TableComponent from './components/TableComponent'; // Importa el nuevo componente de tabla

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
}

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta para la página principal */}
                <Route path="/" element={<MainContent />} />
                {/* Ruta para la página de dependencia */}
                <Route path="/dependencia/*" element={<DependenciaLayout />} />
                {/* Ruta para la página de login */}
                <Route path="/login/*" element={<LoginLayout />} />
                {/* Ruta para la página de tabla */}
                <Route path="/table/" element={<TableLayout />} />
                {/* Ruta de página no encontrada */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </Router>
    );
}

const DependenciaLayout = () => {
    return (
        <div>
            <Navbar />
            {/* Renderiza el contenido dentro de la ruta de dependencia */}
            <Routes>
                <Route path="/" element={<FormDependencia />} />
            </Routes>
        </div>
    );
}

const LoginLayout = () => {
    return (
        <div>
            <NavbarLogin />
            {/* Renderiza el contenido dentro de la ruta de login */}
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    );
}

const TableLayout = () => {
    return (
        <div>
            {/* <Navbar /> */}
            {/* Renderiza el contenido dentro de la ruta de tabla */}
            <Routes>
                <Route path="/" element={<TableComponent />} />
            </Routes>
        </div>
    );
}

export default App;
