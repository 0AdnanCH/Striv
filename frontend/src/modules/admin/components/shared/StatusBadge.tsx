import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'VALID')
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
        <CheckCircle2 size={12} /> VERIFIED
      </span>
    );
  if (status === 'INVALID')
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
        <XCircle size={12} /> REJECTED
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
      <AlertCircle size={12} /> PENDING
    </span>
  );
};
