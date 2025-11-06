import React from 'react';
import BaseConfirmModal from '../../../../components/ui/BaseConfirmModal';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface AdminLogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogoutConfirmModal: React.FC<AdminLogoutConfirmModalProps> = ({ isOpen, onClose }) => {
  const { logout } = useAdminAuth();

  const handleConfirm = () => {
    logout();
    onClose();
  };

  return (
    <BaseConfirmModal
      isOpen={isOpen}
      title="Logout Confirmation"
      message="Are you sure you want to log out from your admin account?"
      confirmText="Logout"
      cancelText="Cancel"
      onConfirm={handleConfirm}
      onCancel={onClose}
      theme={{
        bg: 'bg-white',
        text: 'text-admin-primary',
        border: 'border-admin-secondary/40',
        accent: 'bg-red-500 text-white hover:bg-red-600 transition',
        cancelBg: 'bg-gray-100 hover:bg-gray-200'
      }}
    />
  );
};

export default AdminLogoutConfirmModal;