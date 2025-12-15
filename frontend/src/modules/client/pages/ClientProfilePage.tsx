import React from 'react';
import ClientProfile from '../components/profile/ClientProfile';
import { AccountLayout } from '../../../components/layout/AccountLayout'; 

const ClientProfilePage: React.FC = () => {
  return (
    <AccountLayout>
      <ClientProfile />
    </AccountLayout>
  );
};

export default ClientProfilePage;