
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// A simple implementation for demonstration purposes
// In a real app, this would check authentication from a global context
const isAuthenticated = () => {
  // Check if user is logged in by looking for a token in localStorage
  return !!localStorage.getItem('auth_token');
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Please log in to access this page");
    }
  }, []);

  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated, preserving the intended destination
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
