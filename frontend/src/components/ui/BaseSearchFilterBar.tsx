// src/components/ui/BaseSearchFilterBar.tsx
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn.util';

interface FilterOption {
  label: string;
  key: string;
  options: string[];
}

interface BaseSearchFilterBarProps {
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onSearch?: (value: string) => void;
  onFilterChange?: (key: string, value: string) => void;
  className?: string;
  theme?: {
    bg?: string;
    border?: string;
    text?: string;
    accent?: string;
  };
}

export const BaseSearchFilterBar: React.FC<BaseSearchFilterBarProps> = ({
  searchPlaceholder = 'Search...',
  filters = [],
  onSearch,
  onFilterChange,
  className,
  theme = {
    bg: 'bg-white',
    border: 'border-admin-secondary/30',
    text: 'text-admin-primary',
    accent: 'focus:ring-admin-accent/40'
  }
}) => {
  return (
    <div className={cn('flex flex-wrap justify-end items-center gap-4 px-6 py-4 border-b', theme.bg, theme.border, className)}>
      {/* 🔍 Search + Filters Wrapper */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 🔍 Search Input */}
        <div className="relative flex items-center w-full sm:w-64">
          <Search size={18} className={cn('absolute left-3 text-striv-secondary')} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className={cn('w-full pl-10 pr-4 py-2 border rounded-lg text-sm transition-all duration-200 appearance-none', theme.text, theme.border, 'focus:outline-none focus:ring-2', theme.accent)}
          />
        </div>

        {/* 🧩 Filters */}
        {filters.map((filter) => (
          <div key={filter.key} className="relative flex items-center">
            <select
              className={cn(
                'appearance-none pr-8 pl-3 py-2 border rounded-lg text-sm bg-white leading-tight cursor-pointer',
                theme.text,
                theme.border,
                'focus:outline-none focus:ring-2',
                theme.accent
              )}
              onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>

            {/* Custom Dropdown Icon */}
            <ChevronDown size={16} className="absolute right-3 pointer-events-none text-admin-secondary" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseSearchFilterBar;