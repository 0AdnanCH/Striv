import React from 'react';
import { SectionCard, InfoRow } from '../shared/TrainerHubUI';
import { EditInput, EditSelect } from '../shared/TrainerHubInputs';
import type { IPersonalInfo } from '../../../types/trainerApplication.types';

interface Props {
  data: IPersonalInfo | null;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const PersonalInfoSection: React.FC<Props> = ({ 
  data, 
  isEditing, 
  canEdit, 
  onEdit, 
  onCancel, 
  onChange 
}) => {
  return (
    <SectionCard 
      title="Personal Information" 
      isEditing={isEditing} 
      canEdit={canEdit} 
      onEdit={onEdit} 
      onCancel={onCancel}
    >
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile Photo Helper Block */}
          <div className="col-span-full flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
            <img src={data?.profile_photo} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <label className="text-xs font-bold text-striv-secondary uppercase">Profile Photo URL</label>
              <input
                type="text"
                className="w-full text-sm bg-transparent border-b border-gray-300 focus:border-striv-accent outline-none"
                value={data?.profile_photo}
                onChange={(e) => onChange('profile_photo', e.target.value)}
              />
            </div>
          </div>
          <EditInput label="First Name" value={data?.first_name} onChange={(v: any) => onChange('first_name', v)} />
          <EditInput label="Last Name" value={data?.last_name} onChange={(v: any) => onChange('last_name', v)} />
          <EditSelect label="Gender" value={data?.gender} options={['Male', 'Female', 'Other']} onChange={(v: any) => onChange('gender', v)} />
          <EditInput label="Age" type="number" value={data?.age} onChange={(v: any) => onChange('age', Number(v))} />
          <EditInput label="Phone" value={data?.phone} onChange={(v: any) => onChange('phone', v)} />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <img src={data?.profile_photo || 'https://via.placeholder.com/100'} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-striv-bg" />
            <div>
              <h4 className="text-xl font-bold text-gray-800">
                {data?.first_name} {data?.last_name}
              </h4>
              <p className="text-striv-secondary text-sm">
                {data?.gender} • {data?.age} years old
              </p>
            </div>
          </div>
          <InfoRow label="Phone Contact" value={data?.phone} />
        </>
      )}
    </SectionCard>
  );
};
