import React, { useState } from 'react';
import { LogOut, KeyRound, User, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '../../auth/context/AuthContext';
import { cn } from '../../../utils/cn.util';
import { BaseConfirmModal } from '../../../components/shared/modal'; 
import { Link, useNavigate } from 'react-router-dom';
import ClientChangePassword from '../components/forms/ClientChangePassword';
import { UserRole } from '../../../constants/userRole.constant';

const ClientChangePasswordPage: React.FC = () => {
  const { logout, user } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const openLogoutModal = () => setShowLogoutModal(true);
  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleLogoutConfirm = () => {
    logout(UserRole.CLIENT);
    setShowLogoutModal(false);
  };

  const navItems = [
    { label: 'Profile', icon: <User size={18} />, action: () => navigate('/client/profile') },
    { label: 'Reset Password', icon: <KeyRound size={18} />, action: () => {}, active: true }
  ];

  return (
    <div className="min-h-screen bg-striv-bg flex relative">
      {/* BACK HOME BUTTON */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 
                   bg-white px-3 py-2 rounded-full shadow-md 
                   hover:bg-gray-100 transition-all"
      >
        <ArrowLeft className="h-5 w-5 text-striv-primary" />
        <span className="text-sm font-medium text-gray-700">Back to Home</span>
      </Link>

      {/* SIDEBAR */}
      <aside className={cn('hidden md:flex flex-col w-64 px-6 py-10', 'bg-white/40 backdrop-blur-xl border-r border-striv-muted/40 shadow-md')}>
        {/* HEADER */}
        <div className="mb-12 mt-10">
          <h2 className="text-2xl font-bold text-striv-primary tracking-tight">Account</h2>
          <p className="text-sm text-gray-700 mt-1">{user?.email}</p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition',
                item.active ? 'bg-striv-primary text-white shadow-md' : 'text-gray-800 hover:bg-striv-muted/30 hover:text-striv-primary'
              )}
            >
              <span className={cn(item.active ? 'text-white' : 'text-striv-secondary')}>{item.icon}</span>
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

      {/* MAIN CONTENT — CENTERED */}
      <main className="flex-1 flex justify-center items-center p-6 sm:p-10">
        <div className="w-full max-w-lg">
          <ClientChangePassword />
        </div>
      </main>

      {/* LOGOUT MODAL */}
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

export default ClientChangePasswordPage;