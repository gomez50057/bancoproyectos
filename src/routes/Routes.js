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
import PrivateRoute from './PrivateRoute'; 
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/NavbarLogin';

const MainLayout = ({ children }) => (
    <div>
        <Navbar />
        {children}
    </div>
);

const LoginLayout = ({ children }) => (
    <div>
        <NavbarLogin />
        {children}
    </div>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="/project-indicators" element={<MainLayout><ProjectIndicators /></MainLayout>} />
            <Route path="/interesting-pages" element={<MainLayout><InterestingPages /></MainLayout>} />
            <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
            <Route path="/interactive-map" element={<MainLayout><InteractiveMap /></MainLayout>} />
            <Route path="/login" element={<LoginLayout><Login /></LoginLayout>} />
            <Route path="/table" element={<MainLayout><TableComponent /></MainLayout>} />
            <Route path="/dependencia/*" element={<PrivateRoute allowedGroups={['cliente']}><MainLayout><FormDependencia /></MainLayout></PrivateRoute>} />
            <Route path="/panel-usuario/*" element={<PrivateRoute allowedGroups={['cliente']}><MainLayout><ClientPanel /></MainLayout></PrivateRoute>} />
            <Route path="/crud" element={<PrivateRoute allowedGroups={['responsable']}><MainLayout><CRUDTable /></MainLayout></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
