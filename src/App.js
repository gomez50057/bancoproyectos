// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de que AuthProvider está importado correctamente

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <AppRoutes />
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
