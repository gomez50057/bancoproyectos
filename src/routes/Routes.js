// Archivo: src/routes/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainContent from '../pages/FrontPage/MainContent'; 
import Login from '../components/Login';
import FormDependencia from '../pages/Client/FormDependencia';
import TableComponent from '../pages/FrontPage/TableComponent';
import CRUDTable from '../pages/Responsible/CRUDTable';
import ClientPanel from '../pages/Client/ClientPanel';
import ClientProjects from '../pages/Client/ClientProjects'; 
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
            <Route path="/" element={<MainLayout><MainContent /></MainLayout>} />
            <Route path="/login" element={<LoginLayout><Login /></LoginLayout>} />
            <Route path="/table" element={<MainLayout><TableComponent /></MainLayout>} />
            <Route path="/dependencia/*" element={<PrivateRoute allowedGroups={['cliente']}><MainLayout><FormDependencia /></MainLayout></PrivateRoute>} />
            <Route path="/panel-usuario/*" element={<PrivateRoute allowedGroups={['cliente']}><MainLayout><ClientPanel /></MainLayout></PrivateRoute>} />
            <Route path="/consulta" element={<PrivateRoute allowedGroups={['cliente']}><MainLayout><ClientProjects /></MainLayout></PrivateRoute>} />
            <Route path="/crud" element={<PrivateRoute allowedGroups={['responsable']}><MainLayout><CRUDTable /></MainLayout></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;