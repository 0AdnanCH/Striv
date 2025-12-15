import React from 'react';
import { Edit2, X } from 'lucide-react';

interface SectionCardProps {
  title: string;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  title, isEditing, onEdit, onCancel, canEdit, children 
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-striv-muted/30 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
    <div className="flex justify-between items-center px-6 py-4 border-b border-striv-bg bg-gray-50/50">
      <h3 className="text-lg font-bold text-striv-primary flex items-center gap-2">
        <div className="w-2 h-6 bg-striv-accent rounded-full"></div>
        {title}
      </h3>
      {canEdit && !isEditing && (
        <button onClick={onEdit} className="text-sm font-medium text-striv-secondary hover:text-striv-primary flex items-center gap-1 transition-colors">
          <Edit2 size={16} /> Edit
        </button>
      )}
      {isEditing && (
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-striv-accent uppercase tracking-wider bg-striv-bg px-2 py-1 rounded">Editing...</span>
          <button onClick={onCancel} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export const InfoRow = ({ label, value, isList = false }: { label: string; value: React.ReactNode; isList?: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-dashed border-gray-100 last:border-0">
    <span className="text-sm font-medium text-striv-secondary">{label}</span>
    <div className="col-span-2 text-gray-700 font-medium break-words">
      {isList && Array.isArray(value) ? (
         <div className="flex flex-wrap gap-2">
           {value.map((v, i) => <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-600">{v}</span>)}
         </div>
      ) : (
        value || <span className="text-gray-400 italic">Not provided</span>
      )}
    </div>
  </div>
);