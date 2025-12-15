import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-striv-primary mb-1.5">{label}</label>
    {children}
  </div>
);

export const EditInput = ({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  placeholder = ''
}: {
  label: string;
  value: any;
  onChange: (val: any) => void;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
}) => (
  <InputGroup label={label}>
    {multiline ? (
      <textarea
        className="w-full px-4 py-2 rounded-lg border border-striv-muted focus:border-striv-accent outline-none h-24 text-sm resize-none"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        className="w-full px-4 py-2 rounded-lg border border-striv-muted focus:border-striv-accent outline-none text-sm"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </InputGroup>
);

export const EditSelect = ({ label, value, onChange, options }: { 
  label: string; value: any; onChange: (val: any) => void; options: string[] 
}) => (
  <InputGroup label={label}>
    <select className="w-full px-4 py-2 rounded-lg border border-striv-muted bg-white text-sm" value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled>Select {label}</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </InputGroup>
);

export const ChipArrayEditor = ({ label, values, onChange }: { label: string; values: string[]; onChange: (vals: string[]) => void; }) => {
  const [input, setInput] = useState("");
  const handleAdd = () => { if (input.trim()) { onChange([...(values || []), input.trim()]); setInput(""); } };
  return (
    <InputGroup label={label}>
      <div className="flex gap-2 mb-2">
        <input className="flex-1 px-4 py-2 rounded-lg border border-striv-muted text-sm" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Add ${label}...`} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
        <button onClick={handleAdd} className="bg-striv-secondary text-white p-2 rounded-lg hover:bg-striv-primary"><Plus size={18} /></button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values?.map((val, idx) => (
          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-gray-200">
            {val} <button onClick={() => onChange(values.filter((_, i) => i !== idx))}><Trash2 size={12} /></button>
          </span>
        ))}
      </div>
    </InputGroup>
  );
};