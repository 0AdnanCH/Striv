import React from 'react';
import BaseSigninForm from '../../../../components/forms/BaseSigninForm';
import { type SigninSchema } from '../../../auth/schemas';

interface AdminSigninFormProps {
  onSubmit: (data: SigninSchema) => void;
  loading?: boolean;
}

const AdminSigninForm: React.FC<AdminSigninFormProps> = ({ onSubmit, loading }) => {
  return (
    <BaseSigninForm
      onSubmit={onSubmit}
      loading={loading}
      title="Admin Dashboard"
      subtitle="Sign in to manage Striv platform"
      buttonText="Admin Sign In"
      theme={{
        primary: 'text-admin-text',
        accent: 'from-admin-accent to-admin-secondary',
        background: 'bg-admin-bg',
        border: 'border-admin-secondary',
      }}
    />
  );
}

export default AdminSigninForm;
