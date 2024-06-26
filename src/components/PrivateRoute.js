// Archivo: src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Asumiendo que tienes un hook para obtener la autenticación

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (!user.groups.includes('admin')) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;
