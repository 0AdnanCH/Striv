import React from 'react';
import { BaseUserProfile } from '../../../../components/shared/form'; 
import { useClientProfile } from '../../hooks/useClientProfile';

const ClientProfile: React.FC = () => {
  const { profile, loading, handleFieldUpdate } = useClientProfile();

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-striv-primary font-semibold text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <BaseUserProfile
      data={{
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        role: profile.role,
        gender: profile.gender,
        age: profile.age,
        height: profile.height,
        weight: profile.weight
      }}
      showGender
      showAge
      showHeight
      showWeight
      onFieldUpdate={handleFieldUpdate}
      theme={{
        primary: 'text-striv-primary',
        accent: 'from-striv-primary to-striv-accent',
        bg: 'transparent', // ⭐ IMPORTANT - no white box inside another white box
        border: 'border-striv-muted',
        text: 'text-gray-700',
        buttonBg: 'bg-striv-primary'
      }}
    />
  );
};

export default ClientProfile;