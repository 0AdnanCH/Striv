import React from 'react';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { cn } from '../../../../utils/cn.util';
import type { VerificationState } from '../../types/adminTrainerVerification.types'; 
import { useNavigate } from 'react-router-dom';

interface VerificationSidebarProps {
  activeTab: keyof VerificationState;
  setActiveTab: (tab: keyof VerificationState) => void;
  verificationStatus: VerificationState;
}

export const TrainerVerificationSidebar: React.FC<VerificationSidebarProps> = ({ activeTab, setActiveTab, verificationStatus }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-80 bg-white border-r border-slate-200 h-full overflow-y-auto z-10 shrink-0">
      <div className="p-6 border-b border-slate-100">
        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors" onClick={() => navigate('/admin/trainer-application-list')}>
          <ArrowLeft size={16} /> Back to List
        </button>
        <h2 className="text-lg font-bold text-slate-900">Sections</h2>
        <p className="text-xs text-slate-500 mt-1">Review all 4 sections to enable approval.</p>
      </div>

      <nav className="p-4 space-y-2">
        {(Object.keys(verificationStatus) as Array<keyof VerificationState>).map((section) => (
          <button
            key={section}
            onClick={() => setActiveTab(section)}
            className={cn(
              'w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group text-left',
              activeTab === section ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn('w-2 h-full absolute left-0 top-0 rounded-l-xl transition-all', activeTab === section ? 'bg-blue-600' : 'bg-transparent')} />
              <div>
                <span className={cn('block text-sm font-semibold capitalize', activeTab === section ? 'text-blue-900' : 'text-slate-700')}>{section.replace('Info', '')} Info</span>
              </div>
            </div>
            {/* Status Indicator Icon */}
            {verificationStatus[section] === 'VALID' && <CheckCircle2 size={18} className="text-green-500" />}
            {verificationStatus[section] === 'INVALID' && <XCircle size={18} className="text-red-500" />}
            {verificationStatus[section] === 'PENDING' && <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-slate-300" />}
          </button>
        ))}
      </nav>
    </div>
  );
};