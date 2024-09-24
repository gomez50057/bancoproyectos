// App.js
import React from 'react';
// import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HashRouter as Router, useLocation } from 'react-router-dom';


import Footer from './components/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

const AppContent = () => {
    const location = useLocation();
    const hideFooterRoutes = [
        '/project-report-react/:projectId',
        '/reporte-inversion/:projectId'
    ];

    const shouldHideFooter = hideFooterRoutes.some(route =>
        new RegExp(route.replace(':projectId', '[^/]+')).test(location.pathname)
    );

    return (
        <div>
            <AppRoutes />
            {!shouldHideFooter && <Footer />}
        </div>
    );
};

export default App;
