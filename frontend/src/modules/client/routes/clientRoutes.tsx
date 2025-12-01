import type { RouteObject } from 'react-router-dom';
import ClientProfilePage from '../pages/ClientProfilePage';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import ClientChangePasswordPage from '../pages/ClientChangePasswordPage';
import { UserRole } from '../../../constants/userRole.constant';

const clientRoutes: RouteObject[] = [
  { path: 'client/profile', element: <ClientProfilePage /> },
  { path: 'client/change-password', element: <ClientChangePasswordPage /> },
];

export const protectedClientRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={[UserRole.CLIENT]} />,
    children: clientRoutes
  }
];