import React from 'react';
import { BasePagination } from '../../../../components/base/pagination';  

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AdminPagination: React.FC<AdminPaginationProps> = (props) => {
  return (
    <BasePagination
      {...props}
      theme={{
        // Using your specific Admin Color Palette
        primary: 'bg-[#1E293B] text-white hover:bg-[#334155]', // Slate-800
        accent: 'bg-[#3B82F6] text-white',                     // Blue-500
        text: 'text-[#64748B]',                                // Slate-500
        bg: 'bg-white',
        border: 'border-[#64748B]/20'
      }}
    />
  );
};