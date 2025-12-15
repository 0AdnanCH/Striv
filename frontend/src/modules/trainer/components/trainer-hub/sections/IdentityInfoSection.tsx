import type React from "react";
import type { ITrainerIdentityInfo } from "../../../types/trainerApplication.types";
import { InfoRow, SectionCard } from "../shared/TrainerHubUI";
import { EditSelect } from "../shared/TrainerHubInputs";
import { UploadCloud } from "lucide-react";

interface Props {
  data: ITrainerIdentityInfo | null;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const IdentityInfoSection: React.FC<Props> = ({ 
  data, 
  isEditing, 
  canEdit, 
  onEdit, 
  onCancel, 
  onChange
}) => {
  return (
    <SectionCard title="Identity Verification" isEditing={isEditing} canEdit={canEdit} onEdit={onEdit} onCancel={onCancel}>
      {isEditing ? (
        <div className="space-y-4">
          <EditSelect
            label="Document Type"
            value={data?.documentType}
            options={['Driving License', 'Passport', 'National ID', 'Voter ID']}
            onChange={(v) => onChange('documentType', v)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fake Upload UI for Demo */}
            {['frontImage', 'backImage'].map((field) => (
              <div key={field} className="border-2 border-dashed border-striv-muted rounded-xl p-6 text-center bg-gray-50 hover:bg-white transition-colors cursor-pointer">
                <UploadCloud className="mx-auto text-striv-secondary mb-2" />
                <p className="text-sm font-bold text-striv-primary capitalize">Update {field.replace('Image', '')} View</p>
                <input
                  type="text"
                  placeholder="Paste Image URL..."
                  className="mt-2 w-full text-xs border p-1 rounded"
                  value={(data as any)[field] || ''}
                  onChange={(e) => onChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <InfoRow label="Document Type" value={data?.documentType} />
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            <div className="shrink-0">
              <p className="text-xs text-striv-secondary mb-1">Front View</p>
              <img src={data?.frontImage} alt="ID Front" className="h-32 rounded-lg border border-gray-200 object-contain bg-gray-50" />
            </div>
            {data?.backImage && (
              <div className="shrink-0">
                <p className="text-xs text-striv-secondary mb-1">Back View</p>
                <img src={data?.backImage} alt="ID Back" className="h-32 rounded-lg border border-gray-200 object-contain bg-gray-50" />
              </div>
            )}
          </div>
        </>
      )}
    </SectionCard>
  );
}