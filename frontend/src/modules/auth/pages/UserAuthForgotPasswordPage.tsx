import React, { useState } from 'react';
import UserAuthForgotPasswordForm from '../components/forms/UserAuthForgotPasswordForm'; 
import { type ForgotPasswordSchema } from '../../../schemas/forgotPassword.schema';

// ✅ Page Component
const UserAuthForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async (data: ForgotPasswordSchema) => {
    setLoading(true);
    setSuccessMessage('');

    try {
      // ✅ API Call (placeholder)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage("If this email exists, we've sent you a password reset link.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-striv-bg">
      <div className="w-full max-w-xl">
        <UserAuthForgotPasswordForm onSubmit={handleForgotPassword} loading={loading} />

        {successMessage && <p className="mt-4 text-center text-striv-primary font-medium">{successMessage}</p>}
      </div>
    </div>
  );
};

export default UserAuthForgotPasswordPage;