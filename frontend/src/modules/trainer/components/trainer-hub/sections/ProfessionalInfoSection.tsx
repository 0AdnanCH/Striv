import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { SectionCard, InfoRow } from '../shared/TrainerHubUI';
import { EditInput, ChipArrayEditor } from '../shared/TrainerHubInputs';
import { CertificatesEditor } from '../editors/CertificatesEditor';
import type { IProfessionalInfo } from '../../../types/trainerApplication.types';

interface Props {
  data: IProfessionalInfo | null;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate: (field: string, value: any) => void;
  onPortfolioUpdate: (field: string, value: any) => void;
  onSocialUpdate: (field: string, value: any) => void;
}

export const ProfessionalInfoSection: React.FC<Props> = ({ 
  data, 
  isEditing, 
  canEdit, 
  onEdit, 
  onCancel, 
  onUpdate, 
  onPortfolioUpdate, 
  onSocialUpdate 
}) => {
  return (
    <SectionCard title="Professional Qualifications" isEditing={isEditing} canEdit={canEdit} onEdit={onEdit} onCancel={onCancel}>
      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditInput label="Years of Experience" type="number" value={data?.yearsOfExperience} onChange={(v) => onUpdate('yearsOfExperience', Number(v))} />
            <ChipArrayEditor label="Specializations" values={data?.specialization || []} onChange={(v) => onUpdate('specialization', v)} />
          </div>

          <ChipArrayEditor label="Additional Skills" values={data?.additionalSkills || []} onChange={(v) => onUpdate('additionalSkills', v)} />

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-bold text-striv-primary mb-3">Portfolio & Socials</h4>
            <EditInput label="Bio" multiline value={data?.portfolio?.bio} onChange={(v) => onPortfolioUpdate('bio', v)} />
            <ChipArrayEditor label="Achievements" values={data?.portfolio?.achievements || []} onChange={(v) => onPortfolioUpdate('achievements', v)} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-lg">
              <EditInput label="Website" value={data?.portfolio.socialLinks?.website} onChange={(v) => onSocialUpdate('website', v)} placeholder="https://" />
              <EditInput label="LinkedIn" value={data?.portfolio.socialLinks?.linkedin} onChange={(v) => onSocialUpdate('linkedin', v)} placeholder="https://linkedin.com/in/..." />
              <EditInput label="Instagram" value={data?.portfolio.socialLinks?.instagram} onChange={(v) => onSocialUpdate('instagram', v)} placeholder="@username" />
              <EditInput label="YouTube" value={data?.portfolio.socialLinks?.youtube} onChange={(v) => onSocialUpdate('youtube', v)} placeholder="Channel URL" />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-bold text-striv-primary mb-3">Certificates</h4>
            <CertificatesEditor certs={data?.certificates || []} onChange={(v) => onUpdate('certificates', v)} />
          </div>
        </div>
      ) : (
        <>
          <InfoRow label="Experience" value={`${data?.yearsOfExperience} Years`} />
          <InfoRow label="Specializations" value={data?.specialization} isList />
          <InfoRow label="Additional Skills" value={data?.additionalSkills} isList />
          <InfoRow label="Bio" value={data?.portfolio.bio} />
          <InfoRow label="Achievements" value={data?.portfolio.achievements} isList />

          <div className="py-3 border-b border-dashed border-gray-100">
            <span className="text-sm font-medium text-striv-secondary block mb-2">Social Links</span>
            <div className="flex gap-4">
              {Object.entries(data?.portfolio.socialLinks || {}).map(
                ([key, val]) =>
                  val && (
                    <a key={key} href={val} target="_blank" rel="noreferrer" className="text-striv-accent hover:text-striv-primary flex items-center gap-1 text-sm capitalize">
                      <LinkIcon size={14} /> {key}
                    </a>
                  )
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-striv-secondary mb-3">Certificates</p>
            <div className="grid grid-cols-1 gap-4">
              {data?.certificates?.map((cert, idx) => (
                <div key={idx} className="flex gap-4 bg-white p-3 rounded-xl border border-striv-muted/30 shadow-sm hover:shadow-md transition-shadow">
                  {/* Certificate Image Thumbnail */}
                  <div className="shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    {cert.fileUrl ? (
                      <img src={cert.fileUrl} alt={cert.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs text-center p-1">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Certificate Info */}
                  <div className="flex flex-col justify-center">
                    <h5 className="font-bold text-gray-800 text-base">{cert.title || 'Untitled Certificate'}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-striv-bg text-striv-primary text-xs font-bold rounded">{cert.issuer || 'Unknown Issuer'}</span>
                      <span className="text-xs text-striv-secondary">Issued: {cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}

              {(!data?.certificates || data.certificates.length === 0) && <div className="text-sm text-gray-400 italic">No certificates added.</div>}
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
};