'use client';

import React, { useState } from 'react';
import BaseChangePasswordForm from '../../../../components/forms/BaseChangePasswordForm';
import { clientService } from '../../api/client.service'; 
import { toast } from 'sonner'; 

const ClientChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    try {
      setLoading(true);

      const res = await clientService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      });

      toast.success(res.message || 'Password updated successfully');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return <BaseChangePasswordForm loading={loading} onSubmit={handleSubmit} />;
};

export default ClientChangePassword;