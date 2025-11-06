import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.config';

const AppRoutes = () => (
  <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>
);

export default AppRoutes;