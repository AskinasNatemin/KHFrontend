import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Logged } from './Context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useContext(Logged);
    return isLogged ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
