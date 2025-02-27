import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '../store/authAtoms';
import { CircularProgress, Box } from '@mui/material';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth: boolean;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredAuth, fallback }) => {
  const user = useAtomValue(userAtom);

  // Determine if the user is authenticated by checking if a token exists.
  const isAuthenticated = user.token !== null;

  // (Optional) If you had an async auth check, you might have a loading state here.
  // For this example, we assume that the auth check is synchronous.

  if (requiredAuth && !isAuthenticated) {
    return fallback ? <>{fallback}</> : <Navigate to="/" replace />;
  }

  if (!requiredAuth && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
