import React from 'react';
import { cn } from '../../utils/cn.util';

interface BaseConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  theme?: {
    bg?: string;
    text?: string;
    border?: string;
    accent?: string;
    cancelBg?: string;
  };
}

const BaseConfirmModal: React.FC<BaseConfirmModalProps> = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  theme = {
    bg: 'bg-admin-bg',
    text: 'text-admin-text',
    border: 'border-admin-secondary/40',
    accent: 'bg-admin-accent text-white hover:bg-admin-primary',
    cancelBg: 'bg-gray-100 hover:bg-gray-200'
  }
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className={cn('w-full max-w-md p-6 rounded-2xl shadow-lg border', theme.bg, theme.text, theme.border)}>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className={cn('px-4 py-2 rounded-md text-sm font-medium transition', theme.cancelBg)}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={cn('px-4 py-2 rounded-md text-sm font-medium transition', theme.accent)}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseConfirmModal;