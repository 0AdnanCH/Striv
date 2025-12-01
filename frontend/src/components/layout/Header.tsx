import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { cn } from '../../utils/cn.util';
import { useAuthContext } from '../../modules/auth/context/AuthContext';
import { BaseConfirmModal } from '../shared/modal';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    if (!user) return;
    logout(); 
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className={cn('w-full flex justify-between items-center px-6 md:px-12 py-4 bg-white/10 backdrop-blur-md text-white shadow-sm sticky top-0 z-50', className)}>
        {/* Brand */}
        <div className="text-2xl font-extrabold tracking-tight cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/')}>
          Striv
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {/* Trainer Registration Button */}
          <button
            onClick={() => navigate('/trainer/register')}
            className="px-4 py-2 rounded-lg font-medium border border-white text-white hover:bg-white hover:text-striv-primary transition-all duration-200"
          >
            Become a Trainer
          </button>

          {!user ? (
            <>
              <button
                onClick={() => navigate('/signin')}
                className="px-5 py-2 rounded-lg font-semibold border border-white text-white hover:bg-white hover:text-striv-primary transition-all duration-200"
              >
                Sign In
              </button>
              <button onClick={() => navigate('/signup')} className="px-5 py-2 rounded-lg font-semibold bg-white text-striv-primary hover:bg-gray-100 transition-all duration-200">
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* User Name */}
              <span onClick={() => navigate('client/profile')} className="font-semibold text-white cursor-pointer">
                {user.first_name} {user.last_name}
              </span>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-4 py-2 rounded-lg font-medium border border-white text-white hover:bg-white hover:text-striv-primary transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
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
    </>
  );
};

export default Header;