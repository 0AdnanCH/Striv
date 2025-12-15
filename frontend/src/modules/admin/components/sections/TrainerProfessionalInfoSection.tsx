import { ExternalLink, FileText } from 'lucide-react';
import type { IProfessionalInfo } from '../../../trainer/types/trainerApplication.types'; 
import { DetailRow } from '../shared/DetailRow';

export const TrainerProfessionalInfoSection = ({ data }: { data: IProfessionalInfo }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Expertise */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Expertise</h4>
        <dl>
          <DetailRow label="Years of Exp." value={`${data.yearsOfExperience} Years`} />
          <DetailRow
            label="Specializations"
            value={
              <div className="flex flex-wrap gap-2">
                {data.specialization.map((s) => (
                  <span key={s} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            }
          />
          <DetailRow label="Skills" value={data.additionalSkills?.join(', ')} />
        </dl>
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Certifications</h4>
        {data.certificates?.map((cert, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-md border border-slate-100">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{cert.title}</p>
                <p className="text-xs text-slate-500">
                  {cert.issuer} • {cert.issuedDate ? new Date(cert.issuedDate).getFullYear() : 'N/A'}
                </p>
              </div>
            </div>
            {cert.fileUrl && (
              <a href={cert.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                View PDF <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Portfolio Links */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Portfolio Links</h4>
        <div className="flex gap-4">
          {data.portfolio.socialLinks?.instagram && (
            <a href={data.portfolio.socialLinks.instagram} target="_blank" className="text-pink-600 hover:underline text-sm flex items-center gap-1">
              Instagram <ExternalLink size={12} />
            </a>
          )}
          {data.portfolio.socialLinks?.linkedin && (
            <a href={data.portfolio.socialLinks.linkedin} target="_blank" className="text-blue-700 hover:underline text-sm flex items-center gap-1">
              LinkedIn <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
