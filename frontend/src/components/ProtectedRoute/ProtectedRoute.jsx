import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import Loader from '../Loader/Loader';

// Wraps routes that require authentication
// Redirects to /login if the user is not logged in
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Still checking token on startup
  if (loading) {
    return <Loader fullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
