import React from 'react';
import AdminSigninForm from '../components/forms/AdminSigninForm';
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminSigninPage: React.FC = () => {
  const { signin, loading } = useAdminAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-admin-bg via-admin-secondary/10 to-admin-bg">
      <div className="w-full max-w-lg">
        <AdminSigninForm onSubmit={signin} loading={loading} />
      </div>
    </div>
  );
}

export default AdminSigninPage;
