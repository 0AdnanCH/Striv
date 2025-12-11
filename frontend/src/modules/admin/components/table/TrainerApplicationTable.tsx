import React from 'react';
import { Eye } from 'lucide-react';
import { BaseTable, type BaseTableColumn } from '../../../../components/base/table'; 
import type { TrainerApplicationListItem } from '../../types/adminTrainer.types'; 
import { TrainerApplicationStatus } from '../../../trainer/constants/trainerApplicationStatus.constant'; 

// --- INTERNAL HELPER: STATUS BADGE ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    [TrainerApplicationStatus.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [TrainerApplicationStatus.APPROVED]: 'bg-green-100 text-green-800 border-green-200',
    [TrainerApplicationStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
};

interface TrainerApplicationTableProps {
  data: TrainerApplicationListItem[];
  loading: boolean;
}

export const TrainerApplicationTable: React.FC<TrainerApplicationTableProps> = ({ data, loading }) => {
  const columns: BaseTableColumn<TrainerApplicationListItem>[] = [
    { 
      key: 'fullName', 
      label: 'Trainer',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.profilePhoto || 'https://via.placeholder.com/40'} 
            alt={row.fullName} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <p className="font-medium text-[#1E293B]">{row.fullName}</p>
            <p className="text-xs text-[#64748B]">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'submittedAt', 
      label: 'Applied Date',
      render: (row) => new Date(row.submittedAt).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) 
    },
    { 
      key: 'currentStep', 
      label: 'Completion',
      render: (row) => (
        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
          Step {row.currentStep}/4
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (row) => <StatusBadge status={row.status} /> 
    },
    {
      key: 'applicationId', // Unique key for the action column
      label: 'Action',
      className: 'text-right',
      render: (row) => (
        <button 
          // In a real app, use navigate() here. e.g. navigate(`/admin/verifications/${row.applicationId}`)
          onClick={() => console.log(`Maps to /admin/verify/${row._id}`)}
          className="bg-[#3B82F6] text-white p-2 rounded-lg hover:bg-blue-600 transition shadow-sm flex items-center gap-2 ml-auto text-xs font-medium"
        >
          <Eye size={16} />
          {row.status === TrainerApplicationStatus.APPROVED ? 'View' : 'Verify'}
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#64748B]/10 overflow-hidden">
      <BaseTable 
        data={data} 
        columns={columns} 
        loading={loading}
        bordered={false} 
        striped={true}   
        theme={{
          headerBg: 'bg-[#1E293B]',     // Admin Slate-800
          headerText: 'text-white',     
          rowHover: 'hover:bg-blue-50', // Light blue hover effect
          border: 'border-gray-200',
          text: 'text-[#334155]',       // Slate-700 text
          bg: 'bg-white'
        }}
        emptyMessage="No trainer applications found matching your criteria."
      />
    </div>
  );
};