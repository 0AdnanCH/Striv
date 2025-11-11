import React from 'react';
import BaseResetPasswordForm from '../../../../components/forms/BaseResetPasswordForm';
import type { ResetPasswordSchema } from '../../../../schemas/resetPassword.schema';

interface UserAuthResetPasswordFormProps {
  onSubmit: (data: ResetPasswordSchema) => void;
  loading?: boolean;
}

const UserAuthResetPasswordForm: React.FC<UserAuthResetPasswordFormProps> = ({ onSubmit, loading }) => {
  return (
    <BaseResetPasswordForm
      onSubmit={onSubmit}
      loading={loading}
      title="Create New Password"
      subtitle="Your new password should be strong and different from your previous ones."
      buttonText="Update Password"
      theme={{
        primary: 'text-striv-primary',
        accent: 'from-striv-primary to-striv-accent',
        background: 'bg-white/60 backdrop-blur-sm',
        border: 'border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'
      }}
    />
  );
};

export default UserAuthResetPasswordForm;