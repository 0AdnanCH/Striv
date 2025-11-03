import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/auth/SignUpPage';
import SignInPage from '../pages/auth/SignInPage';
import VerifySignUpOtpPage from '../pages/auth/VerifySignUpOtpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/signin',
    element: <SignInPage />
  },
  {
    path: '/verify-signup-otp',
    element: <VerifySignUpOtpPage />
  },
  {
    path: '*',
    element: <div className="text-center p-10">404 | Page Not Found</div>
  }
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes;