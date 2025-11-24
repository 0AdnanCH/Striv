import type { RouteObject } from 'react-router-dom';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import ProfessionalInfoPage from '../pages/ProfessionalInfoPage';
import WorkInfoPage from '../pages/WorkInfoPage';
import IdentityInfoPage from '../pages/IdentityInfoPage';
// import ProtectedRoute from '../../../routes/ProtectedRoute';

export const trainerRegistrationRoutes: RouteObject[] = [
  { path: 'trainer/personal-info', element: <PersonalInfoPage /> },
  { path: 'trainer/professional-info', element: <ProfessionalInfoPage /> },
  { path: 'trainer/work-info', element: <WorkInfoPage /> },
  { path: 'trainer/identity', element: <IdentityInfoPage /> },
];