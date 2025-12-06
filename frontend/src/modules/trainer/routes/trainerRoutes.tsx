import type { RouteObject } from 'react-router-dom';
import TrainerApplicationPage from '../pages/TrainerApplicationPage';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import { UserRole } from '../../../constants/userRole.constant';
import TrainerApplicationCompletedPage from '../pages/TrainerApplicationCompletedPage';

const trainerRoutes: RouteObject[] = [
  { path: 'trainer/application', element: <TrainerApplicationPage /> },
  { path: '/trainer/application/completed', element: <TrainerApplicationCompletedPage /> }
];

export const protectedTrainerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={[UserRole.CLIENT]} />,
    children: trainerRoutes
  }
];