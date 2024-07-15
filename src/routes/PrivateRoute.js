// Archivo: src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// const PrivateRoute = ({ children, allowedGroups = [] }) => {
//     const { isAuthenticated, user } = useAuth();
const PrivateRoute = ({ children = [] }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // if (!user || !user.groups || !allowedGroups.some(group => user.groups.includes(group))) {
    //     return <Navigate to="/login" />;
    // }

    return children;
};

export default PrivateRoute;
