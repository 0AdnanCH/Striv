import React from 'react';
import { cn } from '../../utils/cn.util';

interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: {
    primary?: string;
    accent?: string;
    text?: string;
    bg?: string;
    border?: string;
  };
}

const BasePagination: React.FC<BasePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  theme = {
    primary: 'bg-striv-primary text-white hover:bg-striv-accent',
    accent: 'bg-striv-accent text-white',
    text: 'text-striv-primary',
    bg: 'bg-white',
    border: 'border-striv-muted'
  }
}) => {
  if (totalPages <= 1) return null; // No pagination if only 1 page

  // Create page numbers (1, 2, 3, ...)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center gap-2 mt-6 select-none', theme.text)}>
      {/* Previous Button */}
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className={cn('px-3 py-1 text-sm rounded-md border transition', theme.border, theme.bg, 'hover:bg-striv-muted/30')}>
          Previous
        </button>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn('px-3 py-1 text-sm rounded-md border transition', theme.border, currentPage === page ? `${theme.primary} font-semibold` : `${theme.bg} hover:bg-striv-muted/30`)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className={cn('px-3 py-1 text-sm rounded-md border transition', theme.border, theme.bg, 'hover:bg-striv-muted/30')}>
          Next
        </button>
      )}
    </div>
  );
};

export default BasePagination;