import type React from 'react';
import ResetPasswordForm from '../components/forms/ResetPasswordForm'; 
import { useResetPassword } from '../hooks/useResetPassword';

const UserAuthResetPasswordPage: React.FC = () => {
  const { resetPassword, loading } = useResetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-striv-bg">
      <div className="w-full max-w-xl">
        <ResetPasswordForm onSubmit={resetPassword} loading={loading} />
      </div>
    </div>
  );
};
export default UserAuthResetPasswordPage;