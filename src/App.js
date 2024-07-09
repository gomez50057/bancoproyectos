// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/FrontPage/Home';
import About from './pages/FrontPage/About';
import ProjectIndicators from './pages/FrontPage/ProjectIndicators';
import InterestingPages from './pages/FrontPage/InterestingPages';
import HowItWorks from './pages/FrontPage/HowItWorks';
import InteractiveMap from './pages/FrontPage/InteractiveMap';
import Footer from './components/Footer';

import Login from './components/Login';
import NavbarLogin from './components/NavbarLogin';
import FormDependencia from './pages/Client/FormDependencia';
import TableComponent from './pages/FrontPage/TableComponent';
import CRUDTable from './pages/Responsible/CRUDTable';
import ClientPanel from './pages/Client/ClientPanel';
// Importa el componente de ruta privada
import PrivateRoute from './routes/PrivateRoute'; 

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
                <Route path="/login*" element={<LoginLayout />} />
                <Route path="/table" element={<TableLayout />} />
                {/* Usa la ruta privada */}
                <Route path="/dependencia/*" element={<PrivateRoute><DependenciaLayout /></PrivateRoute>} />
                <Route path="/panel-usuario" element={<PrivateRoute><ClientPanel /></PrivateRoute>} /> 
                <Route path="/crud" element={<PrivateRoute><CRUDTable /></PrivateRoute>} /> 
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
