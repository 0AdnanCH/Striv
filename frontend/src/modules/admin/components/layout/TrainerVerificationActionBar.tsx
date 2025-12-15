import React from 'react';
import { ChevronRight } from 'lucide-react';

interface VerificationActionBarProps {
  completedCount: number;
  totalCount: number;
  hasRejections: boolean;
  isAllValid: boolean;
  isSubmitting: boolean;
  onApprove: () => void;
  onRequestChanges: () => void;
}

export const TrainerVerificationActionBar: React.FC<VerificationActionBarProps> = ({ completedCount, totalCount, hasRejections, isAllValid, isSubmitting, onApprove, onRequestChanges }) => {
  return (
    <div className="w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-end items-center gap-4 shrink-0">
      <div className="mr-auto hidden md:block pl-4">
        <p className="text-sm font-medium text-slate-600">
          Summary:{' '}
          <span className="text-slate-900">
            {completedCount}/{totalCount} Verified
          </span>
        </p>
      </div>

      <button
        onClick={onRequestChanges}
        disabled={!hasRejections || isSubmitting}
        className="px-6 py-2.5 rounded-lg font-bold text-red-600 bg-red-50 border border-transparent hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Request Changes
      </button>

      <button
        onClick={onApprove}
        disabled={!isAllValid || isSubmitting}
        className="px-6 py-2.5 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20 transition flex items-center gap-2"
      >
        Approve Application <ChevronRight size={16} />
      </button>
    </div>
  );
};