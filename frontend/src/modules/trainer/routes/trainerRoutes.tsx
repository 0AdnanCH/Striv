import type { RouteObject } from 'react-router-dom';
import TrainerRegistrationPage from '../pages/TrainerRegistrationPage';
import ProtectedRoute from '../../../routes/ProtectedRoute';

const trainerRoutes: RouteObject[] = [
  { path: 'trainer/register', element: <TrainerRegistrationPage /> },
];

export const protectedTrainerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={['client']} />,
    children: trainerRoutes
  }
];