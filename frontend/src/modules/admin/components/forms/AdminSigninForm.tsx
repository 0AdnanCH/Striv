import React from 'react';
import { BaseSigninForm } from '../../../../components/shared/form';
import type { IAdminSigninData } from '../../types/admin.types';

interface AdminSigninFormProps {
  onSubmit: (data: IAdminSigninData) => void;
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
