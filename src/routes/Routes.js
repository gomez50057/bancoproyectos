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
import EditProject from '../pages/Client/EditProject';
import EditProjectInvest from '../pages/Client/PresupuestoInver/EditProjectInvest';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/NavbarLogin';
import ProjectReportReact from '../pages/Responsible/ProjectReportReact'; 

import InvestmentReport from '../pages/Responsible/PresupuestoInver/InvestmentReport'; 


import CedulaRegistroForm from '../pages/Client/PresupuestoInver/CedulaRegistroForm';
import Dashboard from '../pages/Dashboard/Dashboard';



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
            {/* <Route path="/presupuesto-inversion" element={<LoginLayout><CedulaRegistroForm /></LoginLayout>} /> */}
            <Route path="/presupuesto-inversion/*" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><CedulaRegistroForm /></LoginLayout></PrivateRoute>} />

            <Route path="/dependencia/*" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><FormDependencia /></LoginLayout></PrivateRoute>} />
            <Route path="/panel-usuario/*" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><ClientPanel /></LoginLayout></PrivateRoute>} />
            {/* <Route path="/panel-usuario/*" element={<LoginLayout><ClientPanel /></LoginLayout>} /> */}

            <Route path="/consulta" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><ClientProjects /></LoginLayout></PrivateRoute>} />
            <Route path="/editar-proyecto/:projectId" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><EditProject /></LoginLayout></PrivateRoute>} />

            <Route path="/editar-proyecto-inversion/:projectId" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><EditProjectInvest /></LoginLayout></PrivateRoute>} />

            <Route path="/crud" element={<PrivateRoute allowedGroups={['responsable']}><LoginLayout><CRUDTable /></LoginLayout></PrivateRoute>} />
            <Route path="/project-report-react/:projectId" element={<ProjectReportReact />} />


            <Route path="/reporte-inversion" element={<InvestmentReport />} />



            <Route path="*" element={<Navigate to="/" />} />
            
            <Route path="/tablas" element={<Dashboard /> } />
            {/* <Route path="/tablas" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><Dashboard /></LoginLayout></PrivateRoute>} /> */}



        </Routes>
    );
};

export default AppRoutes;