import type { RouteObject } from 'react-router-dom';
import TrainerApplicationPage from '../pages/TrainerApplicationPage';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import { UserRole } from '../../../constants/userRole.constant';

const trainerRoutes: RouteObject[] = [
  { path: 'trainer/register', element: <TrainerApplicationPage /> },
];

export const protectedTrainerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={[UserRole.CLIENT]} />,
    children: trainerRoutes
  }
];