import React from 'react';

export const DetailRow = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ElementType }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-100 last:border-0">
    <dt className="w-1/3 text-sm font-medium text-slate-500 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-slate-400" />} {label}
    </dt>
    <dd className="w-2/3 text-sm text-slate-900 font-medium mt-1 sm:mt-0">{value || '-'}</dd>
  </div>
);
