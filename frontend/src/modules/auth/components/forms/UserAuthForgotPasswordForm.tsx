import React from 'react';
import { BaseForgotPasswordForm } from '../../../../components/shared/form'; 
import type { EmailSchemaType } from '../../schemas';

interface UserAuthForgotPasswordFormProps {
  onSubmit: (data: EmailSchemaType) => void;
  loading?: boolean;
}

const UserAuthForgotPasswordForm: React.FC<UserAuthForgotPasswordFormProps> = ({ onSubmit, loading }) => {
  return (
    <BaseForgotPasswordForm
      onSubmit={onSubmit}
      loading={loading}
      title="Forgot your password?"
      subtitle="Don’t worry, it happens. Enter your email and we’ll send you a reset link."
      buttonText="Send Reset Link"
      bottomLink={{
        text: 'Remembered your password?',
        href: '/signin',
        linkText: 'Back to Sign In'
      }}
      theme={{
        primary: 'text-striv-primary',
        accent: 'from-striv-primary to-striv-accent',
        background: 'bg-white/60 backdrop-blur-sm',
        border: 'border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'
      }}
    />
  );
};

export default UserAuthForgotPasswordForm;