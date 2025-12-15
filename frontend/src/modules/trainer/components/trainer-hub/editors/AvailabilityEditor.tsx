import { Plus, Trash2 } from 'lucide-react';
import type { ITrainerAvailability } from '../../../types/trainerApplication.types';
import { WeekDay } from '../../../constants/weekDay.constant';

export const AvailabilityEditor = ({ 
  schedule, onChange 
}: { 
  schedule: ITrainerAvailability[]; onChange: (newSchedule: ITrainerAvailability[]) => void 
}) => {
  const handleChange = (index: number, field: keyof ITrainerAvailability, value: string) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(schedule.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    onChange([...schedule, { day: WeekDay.MONDAY, startTime: "09:00", endTime: "17:00" }]); // Default
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-gray-700">Weekly Schedule</h4>
        <button onClick={handleAdd} className="text-xs flex items-center gap-1 text-striv-accent font-bold">
          <Plus size={14} /> Add Slot
        </button>
      </div>
      {schedule.map((slot, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-2 mb-3 items-end md:items-center bg-white p-2 rounded shadow-sm">
          <div className="flex-1 w-full">
             <select 
               className="w-full text-sm border-gray-300 rounded p-1"
               value={slot.day} 
               onChange={(e) => handleChange(idx, 'day', e.target.value)}
             >
               {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                 <option key={d} value={d}>{d}</option>
               ))}
             </select>
          </div>
          <div className="flex gap-2 items-center">
            <input type="time" className="text-sm border p-1 rounded" value={slot.startTime} onChange={(e) => handleChange(idx, 'startTime', e.target.value)} />
            <span className="text-gray-400">-</span>
            <input type="time" className="text-sm border p-1 rounded" value={slot.endTime} onChange={(e) => handleChange(idx, 'endTime', e.target.value)} />
          </div>
          <button onClick={() => handleRemove(idx)} className="text-red-400 hover:text-red-600 p-1">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};