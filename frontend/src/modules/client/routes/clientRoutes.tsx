import type { RouteObject } from 'react-router-dom';
import ClientProfilePage from '../pages/ClientProfilePage';
import ProtectedRoute from '../../../routes/ProtectedRoute';

const clientRoutes: RouteObject[] = [
  { path: '/profile', element: <ClientProfilePage /> },
];

export const protectedClientRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={['client']} />,
    children: clientRoutes
  }
];