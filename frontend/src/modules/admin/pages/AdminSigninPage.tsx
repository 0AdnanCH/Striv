import React from 'react';
import AdminSigninForm from '../components/forms/AdminSigninForm';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { type SigninSchema } from '../../auth/schemas';

const AdminSigninPage: React.FC = () => {
  const { signin, loading } = useAdminAuth();

  const handleSignin = (data: SigninSchema) => {
    signin(data);
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-admin-bg via-admin-secondary/10 to-admin-bg">
      <div className="w-full max-w-lg">
        <AdminSigninForm onSubmit={handleSignin} loading={loading} />
      </div>
    </div>
  );
}

export default AdminSigninPage;
