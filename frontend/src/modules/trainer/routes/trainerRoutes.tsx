import type { RouteObject } from 'react-router-dom';
import TrainerApplicationPage from '../pages/TrainerApplicationPage';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import { UserRole } from '../../../constants/userRole.constant';
import TrainerApplicationCompletedPage from '../pages/TrainerApplicationCompletedPage';
import TrainerApplicationHubPage from '../pages/TrainerApplicationHubPage';

const trainerRoutes: RouteObject[] = [
  { path: 'trainer/application', element: <TrainerApplicationPage /> },
  { path: '/trainer/application/completed', element: <TrainerApplicationCompletedPage /> },
  { path: '/trainer/application-hub', element: <TrainerApplicationHubPage /> },
];

export const protectedTrainerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute redirectTo="/signin" allowedRoles={[UserRole.CLIENT]} />,
    children: trainerRoutes
  }
];