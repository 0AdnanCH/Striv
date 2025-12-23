import React, { useEffect, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, FileCheck } from 'lucide-react';
import { InfoRow, SectionCard } from '../shared/TrainerHubUI';
import { EditSelect } from '../shared/TrainerHubInputs';
import type { ITrainerIdentityInfo } from '../../../types/trainerApplication.types';
import { DocumentType } from '../../../constants/trainerDocType.constant';

// Handles the "File vs String" logic and Preview generation internally
const IdentityImageUploader = ({ label, value, onChange }: { label: string; value: string | File | null | undefined; onChange: (file: File | null) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Effect: Sync preview with incoming value (File or URL)
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === 'string') {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-striv-primary">{label}</span>

      {preview ? (
        // STATE: Image Selected / Existing
        <div className="relative group w-full h-48 bg-gray-100 rounded-xl border border-gray-300 overflow-hidden">
          <img src={preview} alt={label} className="w-full h-full object-contain" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
            <div className="flex gap-2">
              <label className="cursor-pointer bg-white text-striv-primary px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors flex items-center gap-2">
                <UploadCloud size={14} /> Change
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              <button onClick={() => onChange(null)} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors">
                <X size={14} />
              </button>
            </div>
            <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">{value instanceof File ? value.name : 'Current Image'}</span>
          </div>
        </div>
      ) : (
        // STATE: Empty / Upload Prompt
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-striv-muted rounded-xl cursor-pointer bg-gray-50 hover:bg-white hover:border-striv-accent transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-striv-accent" />
            </div>
            <p className="mb-1 text-sm font-bold text-gray-700">Click to upload</p>
            <p className="text-xs text-striv-secondary">SVG, PNG, JPG (Max 5MB)</p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};

interface Props {
  data: ITrainerIdentityInfo | null;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const IdentityInfoSection: React.FC<Props> = ({ data, isEditing, canEdit, onEdit, onCancel, onChange }) => {

  const isPanCard = data?.documentType === DocumentType.PAN_CARD;

  const getSafeImageSrc = (src: string | File | undefined | null) => {
    if (src instanceof File) return URL.createObjectURL(src);
    return src || undefined;
  };

  return (
    <SectionCard title="Identity Verification" isEditing={isEditing} canEdit={canEdit} onEdit={onEdit} onCancel={onCancel}>
      {isEditing ? (
        <div className="space-y-6">
          <EditSelect
            label="Document Type"
            value={data?.documentType}
            options={Object.values(DocumentType)}
            onChange={(v) => {
              onChange('documentType', v);
              // Reset images if type changes to avoid confusion
              onChange('frontImage', null);
              onChange('backImage', null);
            }}
          />

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-sm text-blue-800">
            <FileCheck className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-bold">Document Requirements:</p>
              <ul className="list-disc ml-4 mt-1 space-y-0.5 text-blue-700/80 text-xs">
                <li>Ensure the image is clear and not blurry.</li>
                <li>All four corners of the document must be visible.</li>
                <li>Max file size: 5MB.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IdentityImageUploader label="Front View" value={data?.frontImage} onChange={(file) => onChange('frontImage', file)} />

            {!isPanCard && <IdentityImageUploader label="Back View" value={data?.backImage} onChange={(file) => onChange('backImage', file)} />}
          </div>
        </div>
      ) : (
        <>
          <InfoRow label="Document Type" value={data?.documentType} />

          <div className="mt-4">
            <p className="text-sm font-medium text-striv-secondary mb-3">Uploaded Documents</p>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {/* Front Image View */}
              <div className="shrink-0">
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Front Side</p>
                <div className="h-40 w-64 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
                  {data?.frontImage ? (
                    <img src={getSafeImageSrc(data.frontImage)} alt="ID Front" className="h-full w-full object-contain" />
                  ) : (
                    <div className="text-gray-300 flex flex-col items-center">
                      <ImageIcon size={24} />
                      <span className="text-xs mt-1">No Image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Back Image View - Conditional */}
              {!isPanCard && (
                <div className="shrink-0">
                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Back Side</p>
                  <div className="h-40 w-64 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
                    {data?.backImage ? (
                      <img src={getSafeImageSrc(data.backImage)} alt="ID Back" className="h-full w-full object-contain" />
                    ) : (
                      <div className="text-gray-300 flex flex-col items-center">
                        <ImageIcon size={24} />
                        <span className="text-xs mt-1">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
};