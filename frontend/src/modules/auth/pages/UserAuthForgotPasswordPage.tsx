import React from 'react';
import UserAuthForgotPasswordForm from '../components/forms/UserAuthForgotPasswordForm'; 
import { useForgotPassword } from '../hooks/useForgotPassword';

const UserAuthForgotPasswordPage: React.FC = () => {
  const { forgotPassword, loading, message } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-striv-bg">
      <div className="w-full max-w-xl">
        <UserAuthForgotPasswordForm onSubmit={forgotPassword} loading={loading} />

        {message && <p className="mt-4 text-center bg-gradient-to-r from-striv-primary to-striv-accent text-white font-semibold py-3 rounded-xl shadow-md animate-pulse">{message}</p>}
      </div>
    </div>
  );
};

export default UserAuthForgotPasswordPage;