import { type RouteObject } from 'react-router-dom';
import AdminSigninPage from '../pages/AdminSigninPage';
import AdminDashboard from '../pages/AdminDashboard';

import UserManagementPage from '../pages/UserManagementPage';
import TrainerApplicationsListPage from '../pages/TrainerApplicationsListPage';
import TrainerVerificationPage from '../pages/TrainerVerificationPage';

export const publicAdminRoutes: RouteObject[] = [
  {
    path: '/admin/signin',
    element: <AdminSigninPage />
  }
];

export const protectedAdminRoutes: RouteObject[] = [
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/admin/users',
    element: <UserManagementPage />
  },
  {
    path: '/admin/trainer-application-list',
    element: <TrainerApplicationsListPage />
  },
  {
    path: '/admin/trainer-verification',
    element: <TrainerVerificationPage />
  }
];