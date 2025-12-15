import { Trash2 } from "lucide-react";
import type { ICertificateInfo } from "../../../types/trainerApplication.types";
import { EditInput, InputGroup } from "../shared/TrainerHubInputs";

export const CertificatesEditor = ({ 
  certs, onChange 
}: { 
  certs: ICertificateInfo[]; onChange: (newCerts: ICertificateInfo[]) => void 
}) => {
  const handleUpdate = (index: number, field: keyof ICertificateInfo, val: any) => {
    const updated = [...certs];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {certs.map((cert, idx) => (
        <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 relative">
          <button 
            onClick={() => onChange(certs.filter((_, i) => i !== idx))}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
            <EditInput label="Title" value={cert.title} onChange={(v) => handleUpdate(idx, 'title', v)} />
            <EditInput label="Issuer" value={cert.issuer} onChange={(v) => handleUpdate(idx, 'issuer', v)} />
            <InputGroup label="Issued Date">
               <input 
                 type="date" 
                 className="w-full border border-striv-muted rounded-lg px-3 py-2 text-sm"
                 value={cert.issuedDate ? new Date(cert.issuedDate).toISOString().split('T')[0] : ''}
                 onChange={(e) => handleUpdate(idx, 'issuedDate', new Date(e.target.value))}
               />
            </InputGroup>
          </div>
        </div>
      ))}
      <button 
        onClick={() => onChange([...certs, { title: "New Certificate", issuer: "", issuedDate: new Date() }])}
        className="w-full py-2 border-2 border-dashed border-striv-muted text-striv-secondary rounded-lg text-sm font-bold hover:bg-striv-bg"
      >
        + Add Certificate
      </button>
    </div>
  );
};
