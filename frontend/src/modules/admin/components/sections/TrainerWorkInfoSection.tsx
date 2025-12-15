import { Calendar, DollarSign, Users } from 'lucide-react';
import type { IWorkInfo } from '../../../trainer/types/trainerApplication.types';

export const TrainerWorkInfoSection = ({ data }: { data: IWorkInfo }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
            <DollarSign />
          </div>
          <p className="text-slate-500 text-sm font-medium">1-on-1 Session</p>
          <p className="text-2xl font-bold text-slate-900">${data.pricing.oneToOne}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <Users size={20} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Group Session</p>
          <p className="text-2xl font-bold text-slate-900">${data.pricing.groupSession}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Availability Schedule</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.availability.map((slot, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <Calendar size={18} className="text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-800 uppercase">{slot.day}</p>
                <p className="text-xs text-slate-500">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
