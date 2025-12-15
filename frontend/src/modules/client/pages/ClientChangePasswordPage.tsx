import React from 'react';
import ClientChangePassword from '../components/forms/ClientChangePassword';
import { AccountLayout } from '../../../components/layout/AccountLayout'; 

const ClientChangePasswordPage: React.FC = () => {
  return (
    <AccountLayout>
      <ClientChangePassword />
    </AccountLayout>
  );
};

export default ClientChangePasswordPage;