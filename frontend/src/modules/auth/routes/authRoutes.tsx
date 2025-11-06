import type { RouteObject } from 'react-router-dom';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
import VerifySignupOtpPage from '../pages/VerifySignupOtpPage';

export const authRoutes: RouteObject[] = [
  { path: '/signin', element: <SigninPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/verify-signup-otp', element: <VerifySignupOtpPage /> },
];