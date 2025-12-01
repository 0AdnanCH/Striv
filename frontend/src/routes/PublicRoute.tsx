import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../modules/auth/context/AuthContext'; 
import { UserRole } from '../constants/userRole.constant';

interface PublicRouteProps {
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectTo = '/' }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (user) {
    if (user.role === UserRole.ADMIN) return <Navigate to="/admin/dashboard" replace />;
    if (user.role === UserRole.TRAINER) return <Navigate to="/trainer/dashboard" replace />;
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;