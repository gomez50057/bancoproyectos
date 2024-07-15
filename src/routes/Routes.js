// Archivo: src/routes/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/FrontPage/Home';
import About from '../pages/FrontPage/About';
import ProjectIndicators from '../pages/FrontPage/ProjectIndicators';
import InterestingPages from '../pages/FrontPage/InterestingPages';
import HowItWorks from '../pages/FrontPage/HowItWorks';
import InteractiveMap from '../pages/FrontPage/InteractiveMap';
import Login from '../components/Login';
import FormDependencia from '../pages/Client/FormDependencia';
import TableComponent from '../pages/FrontPage/TableComponent';
import CRUDTable from '../pages/Responsible/CRUDTable';
import ClientPanel from '../pages/Client/ClientPanel';
import PrivateRoute from './PrivateRoute'; // Ajustar la ruta aquí

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project-indicators" element={<ProjectIndicators />} />
            <Route path="/interesting-pages" element={<InterestingPages />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/interactive-map" element={<InteractiveMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/table" element={<TableComponent />} />
            <Route path="/dependencia/*" element={<PrivateRoute allowedGroups={['cliente']}><FormDependencia /></PrivateRoute>} />
            <Route path="/panel-usuario/*" element={<PrivateRoute allowedGroups={['cliente']}><ClientPanel /></PrivateRoute>} />
            <Route path="/crud" element={<PrivateRoute allowedGroups={['responsable']}><CRUDTable /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
