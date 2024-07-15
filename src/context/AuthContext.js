// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/current_user/');
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
