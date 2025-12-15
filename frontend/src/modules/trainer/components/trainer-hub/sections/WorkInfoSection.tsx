import type React from "react";
import type { IWorkInfo } from "../../../types/trainerApplication.types";
import { EditInput } from "../shared/TrainerHubInputs";
import { AvailabilityEditor } from "../editors/AvailabilityEditor";
import { SectionCard } from "../shared/TrainerHubUI";

interface Props {
  data: IWorkInfo | null;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const WorkInfoSection: React.FC<Props> = ({ 
  data, 
  isEditing, 
  canEdit, 
  onEdit, 
  onCancel, 
	onChange,
}) => {
	return (
    <SectionCard
      title="Pricing & Availability"
      isEditing={isEditing}
      canEdit={canEdit}
      onEdit={onEdit}
      onCancel={onCancel}
    >
      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditInput
              label="1-on-1 Price ($)"
              type="number"
              value={data?.pricing.oneToOne}
              onChange={(v) => onChange('pricing', { ...data?.pricing, oneToOne: Number(v) })}
            />
            <EditInput
              label="Group Price ($)"
              type="number"
              value={data?.pricing.groupSession}
              onChange={(v) => onChange('pricing', { ...data?.pricing, groupSession: Number(v) })}
            />
          </div>
          <div className="border-t border-gray-100 pt-4">
            <AvailabilityEditor schedule={data?.availability || []} onChange={(v) => onChange('availability', v)} />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-striv-bg/30 p-4 rounded-lg text-center">
              <span className="text-striv-secondary text-xs uppercase font-bold tracking-wider">1-on-1 Session</span>
              <p className="text-3xl font-extrabold text-striv-primary mt-1">${data?.pricing.oneToOne}</p>
            </div>
            <div className="bg-striv-bg/30 p-4 rounded-lg text-center">
              <span className="text-striv-secondary text-xs uppercase font-bold tracking-wider">Group Session</span>
              <p className="text-3xl font-extrabold text-striv-primary mt-1">${data?.pricing.groupSession}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-striv-secondary mb-2">Weekly Availability</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {data?.availability.map((slot, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 p-2 rounded flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-700">{slot.day}</span>
                  <span className="text-gray-500 font-mono text-xs">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
}