import type React from 'react';
import UserAuthResetPasswordForm from '../components/forms/UserAuthResetPasswordForm'; 
import type { ResetPasswordData } from '../types/auth.types';
import { useResetPassword } from '../hooks/useResetPassword';

const UserAuthResetPasswordPage: React.FC = () => {
  const { resetPassword, loading } = useResetPassword();

  const handleResetPassword = async (data: Omit<ResetPasswordData, 'token'>) => {
    resetPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-striv-bg">
      <div className="w-full max-w-xl">
        <UserAuthResetPasswordForm onSubmit={handleResetPassword} loading={loading} />
      </div>
    </div>
  );
};
export default UserAuthResetPasswordPage;