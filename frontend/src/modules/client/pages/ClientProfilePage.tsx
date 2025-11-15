import React, { useState } from 'react';
import ClientProfile from '../components/profile/ClientProfile';
import { LogOut, KeyRound, User } from 'lucide-react';
import { useAuthContext } from '../../auth/context/AuthContext';
import { cn } from '../../../utils/cn.util';
import BaseConfirmModal from '../../../components/ui/BaseConfirmModal';

const ClientProfilePage: React.FC = () => {
  const { logout, user } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => setShowLogoutModal(true);
  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleLogoutConfirm = () => {
    logout('client');
    setShowLogoutModal(false);
  };

  const navItems = [
    { label: 'Profile', icon: <User size={18} />, action: () => {} },
    { label: 'Reset Password', icon: <KeyRound size={18} />, action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-striv-bg flex">
      <aside className={cn('hidden md:flex flex-col w-64 px-6 py-10', 'bg-white/40 backdrop-blur-xl border-r border-striv-muted/40 shadow-md')}>
        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-striv-primary tracking-tight">Account</h2>
          <p className="text-sm text-gray-700 mt-1">{user?.email}</p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex items-center gap-3 px-4 py-3 rounded-lg
              text-gray-800 font-medium hover:bg-striv-muted/30 
              hover:text-striv-primary transition"
            >
              <span className="text-striv-secondary">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto pt-10">
          <button
            onClick={openLogoutModal}
            className="flex items-center gap-3 w-full px-4 py-3 
            rounded-lg font-medium text-red-600
            hover:bg-red-100 active:bg-red-200 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        <div
          className="w-full bg-white/70 backdrop-blur-md 
          border border-striv-muted/30 rounded-2xl p-8 sm:p-10 shadow-md"
        >
          <ClientProfile />
        </div>
      </main>
      <BaseConfirmModal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
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

export default ClientProfilePage;