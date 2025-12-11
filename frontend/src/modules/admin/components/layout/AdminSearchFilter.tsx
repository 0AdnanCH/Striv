import React from 'react';
import { BaseSearchFilterBar } from '../../../../components/base/search-filter';  

interface AdminSearchFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (key: string, value: string) => void;
  filters?: { label: string; key: string; options: string[] }[];
  placeholder?: string;
  className?: string;
}

export const AdminSearchFilter: React.FC<AdminSearchFilterProps> = ({
  onSearch,
  onFilterChange,
  filters = [],
  placeholder = "Search...",
  className
}) => {
  return (
    <BaseSearchFilterBar
      searchPlaceholder={placeholder}
      onSearch={onSearch}
      onFilterChange={onFilterChange}
      filters={filters}
      className={`rounded-xl shadow-sm border border-[#64748B]/10 ${className || ''}`}
      theme={{
        // ADMIN THEME CONFIGURATION
        // Using specific hex codes to match your sidebar/header
        bg: 'bg-white', 
        border: 'border-[#64748B]/20',
        text: 'text-[#1E293B]', // Slate-800 for input text
        accent: 'focus:ring-[#3B82F6]/40' // Blue-500 ring on focus
      }}
    />
  );
};