import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { authRoutes } from '../modules/auth/routes/authRoutes';
import { publicAdminRoutes, protectedAdminRoutes } from '../modules/admin/routes/adminRoutes';
import { protectedClientRoutes } from '../modules/client/routes/clientRoutes';
import { protectedTrainerRoutes } from '../modules/trainer/routes/trainerRoutes';

const baseRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '*',
    element: <div className="text-center p-10">404 | Page Not Found</div>,
  },
];

const publicAuthRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: authRoutes,
  },
];

const adminRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: publicAdminRoutes,
  },
  {
    element: <ProtectedRoute redirectTo='/admin/signin' allowedRoles={['admin']} />,
    children: protectedAdminRoutes,
  }
];

const allRoutes: RouteObject[] = [
  ...baseRoutes,
  ...publicAuthRoutes,
  ...adminRoutes,
  ...protectedClientRoutes,
  ...protectedTrainerRoutes,
];

export const router = createBrowserRouter(allRoutes);