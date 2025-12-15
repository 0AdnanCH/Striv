import React from 'react';
import { Link as LinkIcon, Calendar } from 'lucide-react';
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
    <SectionCard 
      title="Professional Qualifications" 
      isEditing={isEditing} 
      canEdit={canEdit} 
      onEdit={onEdit} 
      onCancel={onCancel}>
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
            <p className="text-sm font-medium text-striv-secondary mb-2">Certificates</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data?.certificates?.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-striv-bg/30 p-3 rounded-lg border border-striv-muted/30">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Calendar size={16} className="text-striv-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{cert.title}</p>
                    <p className="text-xs text-striv-secondary">
                      {cert.issuer} • {cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString() : 'No Date'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
};