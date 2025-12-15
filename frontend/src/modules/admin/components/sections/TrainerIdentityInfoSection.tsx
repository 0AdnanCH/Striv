import { AlertCircle } from 'lucide-react';
import type { ITrainerIdentityInfo } from '../../../trainer/types/trainerApplication.types'; 
import { IdentityImageViewer } from '../shared/IdentityImageViewer';

interface Props {
  data: ITrainerIdentityInfo;
  applicantName: string;
}

export const TrainerIdentityInfoSection = ({ data, applicantName }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
        <AlertCircle className="text-blue-600 shrink-0" size={20} />
        <p className="text-sm text-blue-800">
          Verify the name on the document matches <strong>{applicantName}</strong> and the photo is clear.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 border-b pb-2">{data.documentType.replace('_', ' ')}</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <IdentityImageViewer src={data.frontImage} label="Front Side" />
          {data.backImage ? (
            <IdentityImageViewer src={data.backImage} label="Back Side" />
          ) : (
            <div className="h-48 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
              <span className="text-sm text-slate-400">No Back Side Uploaded</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
