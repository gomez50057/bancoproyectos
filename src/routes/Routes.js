// Archivo: src/routes/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainContent from '../pages/FrontPage/MainContent';
import Login from '../components/Login';
import FormDependencia from '../pages/Client/projectRegistration/FormDependencia';
import TableComponent from '../pages/FrontPage/TableComponent';
import CRUDTable from '../pages/Responsible/projectRegistration/CRUDTable';
import ClientPanel from '../pages/Client/panel/ClientPanel';
import ClientProjects from '../pages/Client/projectRegistration/ClientProjects';
import EditProject from '../pages/Client/projectRegistration/EditProject';
import EditProjectInvest from '../pages/Client/investmentBudget/EditProjectInvest';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import NavbarTable from '../components/NavbarTable';
import NavbarLogin from '../components/NavbarLogin';
import ProjectReportReact from '../pages/Responsible/projectRegistration/ProjectReportReact';
import InvestmentReport from '../pages/Responsible/investmentBudget/InvestmentReport';
import CedulaRegistroForm from '../pages/Client/investmentBudget/CedulaRegistroForm';
import DashboardClient from '../pages/Client/dashboard/DashboardClient';
import DashboardResponsible from '../pages/Responsible/dashboard/DashboardResponsible';
import FAQ from '../pages/FrontPage/faq/FAQ';

import DashboardInvestment from '../pages/visualizer/dashboard/DashboardInvestment';


const MainLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

const ExtraLayout = ({ children }) => (
  <div>
    <NavbarTable />
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
      <Route path="/table" element={<ExtraLayout><TableComponent /></ExtraLayout>} />
      {/* <Route path="/presupuesto-inversion" element={<LoginLayout><CedulaRegistroForm /></LoginLayout>} /> */}
      <Route path="/presupuesto-inversion/*" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><CedulaRegistroForm /></LoginLayout></PrivateRoute>} />

      {/* <Route path="/dependencia" element={<LoginLayout><FormDependencia /></LoginLayout>} /> */}
      <Route path="/dependencia/*" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><FormDependencia /></LoginLayout></PrivateRoute>} />
      {/* <Route path="/panel-usuario/*" element={<LoginLayout><ClientPanel /></LoginLayout>} /> */}
      <Route path="/panel-usuario/*" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><ClientPanel /></LoginLayout></PrivateRoute>} />

      <Route path="/consulta" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><ClientProjects /></LoginLayout></PrivateRoute>} />
      {/* <Route path="/consulta" element={<LoginLayout><ClientProjects /></LoginLayout>} /> */}

      <Route path="/editar-proyecto/:projectId" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><EditProject /></LoginLayout></PrivateRoute>} />
      <Route path="/editar-proyecto-inversion/:projectId" element={<PrivateRoute allowedGroups={['cliente']}><LoginLayout><EditProjectInvest /></LoginLayout></PrivateRoute>} />
      <Route path="/crud" element={<PrivateRoute allowedGroups={['responsable']}><LoginLayout><CRUDTable /></LoginLayout></PrivateRoute>} />
      {/* <Route path="/crud" element={<LoginLayout><CRUDTable /></LoginLayout>} /> */}

      <Route path="/project-report-react/:projectId" element={<ProjectReportReact />} />

      {/* <Route path="/project-report-react/:projectId" element={<PrivateRoute allowedGroups={['responsable']}><ProjectReportReact /></PrivateRoute>} /> */}
      <Route path="/reporte-inversion/:projectId" element={<InvestmentReport />} />
      {/* <Route path="/reporte-inversion/:projectId" element={<PrivateRoute allowedGroups={['responsable']}><InvestmentReport /></PrivateRoute>} /> */}

      {/* <Route path="/panel-proyectos" element={<DashboardClient />} /> */}
      <Route path="/panel-proyectos" element={<PrivateRoute allowedGroups={['cliente']}><DashboardClient /></PrivateRoute>} />

      {/* <Route path="/panel-responsable" element={<DashboardResponsible />} /> */}
      <Route path="/panel-responsable" element={<PrivateRoute allowedGroups={['responsable']}><DashboardResponsible /></PrivateRoute>} />

      <Route path="/preguntas-frecuentes" element={<FAQ />} />

      <Route path="/panel-admin" element={<DashboardInvestment />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;