import React from 'react';
import { Trash2, UploadCloud, FileText, X } from 'lucide-react';
import type { ICertificateInfo } from '../../../types/trainerApplication.types';
import { EditInput, InputGroup } from '../shared/TrainerHubInputs';

export const CertificatesEditor = ({ certs, onChange }: { certs: ICertificateInfo[]; onChange: (newCerts: ICertificateInfo[]) => void }) => {
  const handleUpdate = (index: number, field: keyof ICertificateInfo, val: any) => {
    const updated = [...certs];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Industrial Standard: Create a local preview immediately
      // In a real app, you might store the 'File' object in a separate property or handle the upload here.
      // For this UI demo, we treat fileUrl as the source for the preview.
      const objectUrl = URL.createObjectURL(file);
      handleUpdate(index, 'fileUrl', objectUrl);
    }
  };

  const handleRemoveFile = (index: number) => {
    handleUpdate(index, 'fileUrl', '');
  };

  return (
    <div className="space-y-6">
      {certs.map((cert, idx) => (
        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group transition-all hover:border-striv-secondary/30">
          {/* Remove Certificate Button */}
          <button
            onClick={() => onChange(certs.filter((_, i) => i !== idx))}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors z-10"
            title="Remove Certificate"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* LEFT: File Upload Area (Takes up 4 cols) */}
            <div className="md:col-span-4">
              <label className="block text-sm font-semibold text-striv-primary mb-1.5">Certificate Image</label>

              {cert.fileUrl ? (
                // State: File Selected/Existing
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 group/image">
                  <img src={cert.fileUrl} alt="Certificate Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="cursor-pointer text-white bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm">
                      <UploadCloud size={18} />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(idx, e)} />
                    </label>
                    <button onClick={() => handleRemoveFile(idx)} className="text-white bg-red-500/80 hover:bg-red-600 p-2 rounded-full backdrop-blur-sm">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                // State: No File
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-striv-muted rounded-lg cursor-pointer bg-white hover:bg-striv-bg/20 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-striv-secondary mb-2" />
                    <p className="text-xs text-striv-secondary text-center px-2">
                      <span className="font-bold">Click to upload</span>
                    </p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(idx, e)} />
                </label>
              )}
            </div>

            {/* RIGHT: Details (Takes up 8 cols) */}
            <div className="md:col-span-8 grid grid-cols-1 gap-4">
              <EditInput label="Certificate Title" value={cert.title} placeholder="e.g. Certified Personal Trainer" onChange={(v) => handleUpdate(idx, 'title', v)} />

              <div className="grid grid-cols-2 gap-4">
                <EditInput label="Issuer" value={cert.issuer} placeholder="e.g. NASM" onChange={(v) => handleUpdate(idx, 'issuer', v)} />
                <InputGroup label="Issued Date">
                  <input
                    type="date"
                    className="w-full border border-striv-muted rounded-lg px-3 py-2 text-sm focus:border-striv-accent focus:ring-2 focus:ring-striv-bg outline-none"
                    value={cert.issuedDate ? new Date(cert.issuedDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleUpdate(idx, 'issuedDate', new Date(e.target.value))}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={() => onChange([...certs, { title: '', issuer: '', issuedDate: null, fileUrl: '' }])}
        className="w-full py-3 border-2 border-dashed border-striv-muted text-striv-secondary rounded-xl text-sm font-bold hover:bg-striv-bg hover:text-striv-primary hover:border-striv-primary transition-all flex items-center justify-center gap-2"
      >
        <FileText size={18} />
        Add Another Certificate
      </button>
    </div>
  );
};
