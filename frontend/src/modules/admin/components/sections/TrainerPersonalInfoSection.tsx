import type { IPersonalInfo } from '../../../trainer/types/trainerApplication.types'; 
import { DetailRow } from '../shared/DetailRow';

export const TrainerPersonalInfoSection = ({ data }: { data: IPersonalInfo & { email: string } }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-start gap-6 mb-8">
        <img
          src={typeof data.profile_photo === 'string' ? data.profile_photo : 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm"
        />
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {data.first_name} {data.last_name}
          </h3>
          <p className="text-slate-500 text-sm">
            Age: {data.age} • {data.gender}
          </p>
          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Applicant</div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Basic Details</h4>
        <dl>
          <DetailRow label="First Name" value={data.first_name} />
          <DetailRow label="Last Name" value={data.last_name} />
          <DetailRow label="Email" value={data.email} />
          <DetailRow label="Phone Number" value={data.phone} />
          <DetailRow label="Age" value={data.age} />
          <DetailRow label="Gender" value={data.gender} />
        </dl>
      </div>
    </div>
  );
};
