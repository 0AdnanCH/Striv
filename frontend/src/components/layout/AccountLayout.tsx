import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../modules/auth/context/AuthContext';  
import { BaseConfirmModal } from '../shared/modal';  
import { UserRole } from '../../constants/userRole.constant';  
import { AccountSidebar } from './AccountSidebar'; 

interface ClientAccountLayoutProps {
  children: React.ReactNode;
  pageTitle?: string; // Optional: if you want to update document title
}

export const AccountLayout: React.FC<ClientAccountLayoutProps> = ({ children }) => {
  const { logout, user } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout(UserRole.CLIENT);
    setShowLogoutModal(false);
  };

  return (
    <div className="h-screen bg-striv-bg flex relative overflow-hidden">
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 
        bg-white px-3 py-2 rounded-full shadow-md 
        hover:bg-gray-100 transition-all border border-gray-100"
      >
        <ArrowLeft className="h-5 w-5 text-striv-primary" />
        <span className="text-sm font-medium text-gray-700">Back to Home</span>
      </Link>

      <AccountSidebar userEmail={user?.email} onLogout={() => setShowLogoutModal(true)} />

      <main className="flex-1 h-full overflow-y-auto p-6 sm:p-10 flex justify-center items-start">
        <div className='w-full max-w-5xl py-8'>
          {children}
        </div>
      </main>

      <BaseConfirmModal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
        theme={{
          bg: 'bg-white',
          text: 'text-striv-primary',
          border: 'border-striv-secondary',
          accent: 'bg-striv-primary text-white hover:bg-striv-accent',
          cancelBg: 'bg-gray-200 hover:bg-gray-300'
        }}
      />
    </div>
  );
};
