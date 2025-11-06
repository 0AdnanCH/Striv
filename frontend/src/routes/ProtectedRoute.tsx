import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../modules/auth/context/AuthContext';

interface ProtectedRouteProps {
  redirectTo?: string;
  allowedRoles?: Array<'admin' | 'trainer' | 'client'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = '/signin', allowedRoles }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;