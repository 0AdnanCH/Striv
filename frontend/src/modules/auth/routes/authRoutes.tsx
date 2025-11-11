import type { RouteObject } from 'react-router-dom';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
import VerifySignupOtpPage from '../pages/VerifySignupOtpPage';
import UserAuthForgotPasswordPage from '../pages/UserAuthForgotPasswordPage';
import UserAuthResetPasswordPage from '../pages/UserAuthResetPasswordPage';

export const authRoutes: RouteObject[] = [
  { path: '/signin', element: <SigninPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/verify-signup-otp', element: <VerifySignupOtpPage /> },
  { path: '/forgot-password', element: <UserAuthForgotPasswordPage /> },
  { path: '/reset-password', element: <UserAuthResetPasswordPage /> },
];