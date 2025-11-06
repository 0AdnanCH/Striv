import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../modules/auth/context/AuthContext'; 

interface PublicRouteProps {
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectTo = '/' }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (user) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'trainer') return <Navigate to="/trainer/dashboard" replace />;
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;