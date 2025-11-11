import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserAuthResetPasswordForm from '../components/forms/UserAuthResetPasswordForm'; 
import type { ResetPasswordSchema } from '../../../schemas/resetPassword.schema';

const UserAuthResetPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetPassword = async (data: ResetPasswordSchema) => {
    setLoading(true);
    setSuccessMessage('');

    try {
      // ✅ Call API with token + password
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage('Your password has been successfully updated. You can now sign in.');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-striv-bg">
      <div className="w-full max-w-xl">
        <UserAuthResetPasswordForm onSubmit={handleResetPassword} loading={loading} />

        {successMessage && <p className="mt-4 text-center text-striv-primary font-medium">{successMessage}</p>}
      </div>
    </div>
  );
};
export default UserAuthResetPasswordPage;