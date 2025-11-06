import React, { useState } from 'react';
import { cn } from '../../../../utils/cn.util';
import { LogOut } from 'lucide-react';
import AdminLogoutConfirmModal from '../modals/AdminLogoutConfirmModal';

interface AdminHeaderProps {
  title?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  rightContent?: React.ReactNode;
  className?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title = 'Dashboard Overview', 
  actionButton, 
  rightContent,
  className }) => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  return (
    <>
      <header className={cn('flex justify-between items-center px-8 py-4 bg-admin-primary text-admin-bg shadow-md', className)}>
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex items-center gap-4">
          {rightContent && <div>{rightContent}</div>}

          {actionButton && (
            <button onClick={actionButton.onClick} className="bg-admin-accent text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
              {actionButton.label}
            </button>
          )}

          <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition">
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      <AdminLogoutConfirmModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  );
};

export default AdminHeader;