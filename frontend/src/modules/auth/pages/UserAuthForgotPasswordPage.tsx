import React from 'react';
import UserAuthForgotPasswordForm from '../components/forms/UserAuthForgotPasswordForm'; 
import { useForgotPassword } from '../hooks/useForgotPassword';
import type { ForgotPasswordData } from '../types/auth.types';

const UserAuthForgotPasswordPage: React.FC = () => {
  const { forgotPassword, loading, message } = useForgotPassword();

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    await forgotPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-striv-bg">
      <div className="w-full max-w-xl">
        <UserAuthForgotPasswordForm onSubmit={handleForgotPassword} loading={loading} />

        {message && <p className="mt-4 text-center bg-gradient-to-r from-striv-primary to-striv-accent text-white font-semibold py-3 rounded-xl shadow-md animate-pulse">{message}</p>}
      </div>
    </div>
  );
};

export default UserAuthForgotPasswordPage;