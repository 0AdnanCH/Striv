import React, { useEffect, useRef, useState } from 'react';
import { SectionCard, InfoRow } from '../shared/TrainerHubUI';
import { EditInput, EditSelect } from '../shared/TrainerHubInputs';
import type { IPersonalInfo } from '../../../types/trainerApplication.types';
import { ImageIcon, UploadCloud, X } from 'lucide-react';

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
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state for the preview URL 
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    typeof data?.profile_photo === 'string' ? data.profile_photo : undefined
  );

  // Sync preview with data when data changes 
  useEffect(() => {
    // 1. If no photo data, reset preview
    if (!data?.profile_photo) {
      setPreviewUrl(undefined);
      return;
    }

    // 2. If it's a string (URL from backend), just use it
    if (typeof data.profile_photo === 'string') {
      setPreviewUrl(data.profile_photo);
    } 
    // 3. If it's a File (User just uploaded it), generate a temporary URL
    else if (data.profile_photo instanceof File) {
      const objectUrl = URL.createObjectURL(data.profile_photo);
      setPreviewUrl(objectUrl);

      // Clean up memory when component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [data?.profile_photo]);

  // Handle File Selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // We pass the File to the parent.
      // The parent updates 'data', which triggers the useEffect above.
      // The useEffect then generates the preview URL.
      onChange('profile_photo', file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('');
    onChange('profile_photo', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <SectionCard title="Personal Information" isEditing={isEditing} canEdit={canEdit} onEdit={onEdit} onCancel={onCancel}>
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile Photo Helper Block */}
          <div className="col-span-full">
            <label className="block text-sm font-semibold text-striv-primary mb-2">Profile Photo</label>
            <div className="flex items-center gap-5 p-4 bg-gray-50 border border-dashed border-striv-secondary/40 rounded-xl">
              {/* Preview Circle */}
              <div className="relative shrink-0 group">
                <img src={previewUrl || 'https://via.placeholder.com/150'} alt="Preview" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
                {!previewUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
                    <ImageIcon className="text-gray-400" size={24} />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex-1">
                <div className="flex gap-3 mb-2">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-4 py-2 bg-white border border-striv-muted text-striv-primary text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <UploadCloud size={16} />
                    Change Photo
                  </button>
                  {previewUrl && (
                    <button type="button" onClick={handleRemovePhoto} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove photo">
                      <X size={18} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-striv-secondary">JPG, GIF or PNG. Max size of 2MB.</p>

                {/* Hidden Native Input */}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>
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
            <img src={previewUrl || 'https://via.placeholder.com/100'} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-striv-bg" />
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
