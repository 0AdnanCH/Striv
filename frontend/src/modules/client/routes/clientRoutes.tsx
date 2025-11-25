import type { RouteObject } from 'react-router-dom';
import ClientProfilePage from '../pages/ClientProfilePage';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import ClientChangePasswordPage from '../pages/ClientChangePasswordPage';

const clientRoutes: RouteObject[] = [
  { path: 'client/profile', element: <ClientProfilePage /> },
  { path: 'client/change-password', element: <ClientChangePasswordPage /> },
];

export const protectedClientRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={['client']} />,
    children: clientRoutes
  }
];