'use client';

import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { professionalInfoSchema, type ProfessionalInfoType } from '../../schemas/professionalInfo.schema';
import { Input } from '../../../../components/ui/input'; 
import { Button } from '../../../../components/ui/button';
import { Label } from '@radix-ui/react-label';
import { cn } from '../../../../utils/cn.util';
import { useTrainer } from '../../hooks/useTrainer';

const ACCEPTED_CERT_IMAGE_EXT = '.jpg, .jpeg, .png, .webp';

interface Props {
  loading: boolean;
  onNext?: (data: ProfessionalInfoType) => void;
  onPrev?: () => void;
}

const defaultValues: ProfessionalInfoType = {
  specialization: [],
  additionalSkills: [],
  yearsOfExperience: undefined as any,
  certificates: [],
  portfolio: {
    bio: '',
    achievements: [],
    socialLinks: {
      website: null,
      instagram: null,
      youtube: null,
      linkedin: null
    }
  }
};

const ProfessionalInfoForm: React.FC<Props> = ({ loading, onNext, onPrev }) => {
  const { trainer } = useTrainer();
  
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ProfessionalInfoType>({
    resolver: zodResolver(professionalInfoSchema),
    mode: 'onBlur',
    defaultValues
  });

  // useEffect(() => {
  //   if (!trainer) return;

  //   const mappedValues: ProfessionalInfoType = {
  //     specialization: trainer.specialization || [],
  //     additionalSkills: trainer.additionalSkills || [],
  //     yearsOfExperience: trainer.yearsOfExperience ?? 0,

  //     certificates:
  //       trainer.certificates?.map((c) => ({
  //         title: c.title,
  //         issuer: c.issuer,
  //         issuedDate: c.issuedDate ? new Date(c.issuedDate).toISOString().slice(0, 10) : null,
  //         certificateImage: undefined,
  //       })) || [],

  //     portfolio: {
  //       bio: trainer.portfolio?.bio || '',
  //       achievements: trainer.portfolio?.achievements || [],
  //       socialLinks: {
  //         website: trainer.portfolio?.socialLinks?.website || null,
  //         instagram: trainer.portfolio?.socialLinks?.instagram || null,
  //         youtube: trainer.portfolio?.socialLinks?.youtube || null,
  //         linkedin: trainer.portfolio?.socialLinks?.linkedin || null
  //       }
  //     }
  //   };

  //   reset(mappedValues);
  // }, [trainer, reset]);

  const specArray = useFieldArray({ control, name: 'specialization' as any });
  const skillsArray = useFieldArray({ control, name: 'additionalSkills' as any });
  const certArray = useFieldArray({ control, name: 'certificates' as any });
  const achievementsArray = useFieldArray({ control, name: 'portfolio.achievements' as any });

  const handleCertificateFileChange = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) {
      setValue(`certificates.${index}.certificateImage` as any, undefined, { shouldValidate: true });
      return;
    }

    setValue(`certificates.${index}.certificateImage` as any, files, { shouldValidate: true });
  };

  const normalizeSocialLinks = (links: any) => {
    const out: any = {};
    if (!links) return undefined;
    for (const k of ['website', 'instagram', 'youtube', 'linkedin']) {
      const v = (links as any)[k];
      if (typeof v === 'string') {
        const trimmed = v.trim();
        out[k] = trimmed === '' ? null : trimmed;
      } else {
        out[k] = null;
      }
    }
    return out;
  };

  const onSubmit = async (raw: ProfessionalInfoType) => {
    const payload: ProfessionalInfoType = {
      ...raw,
      certificates: raw.certificates?.map((c: any) => {
        const issuedDate = typeof c.issuedDate === 'string' && c.issuedDate ? new Date(c.issuedDate).toISOString() : null;

        return {
          ...c,
          issuedDate
        };
      }),
      portfolio: {
        ...raw.portfolio,
        socialLinks: normalizeSocialLinks(raw.portfolio?.socialLinks)
      }
    };

    onNext?.(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Specializations - tag-style add / list */}
        <div>
          <Label htmlFor="specialization" className="mb-2 block">
            Specializations
          </Label>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="specialization"
              render={({ field }) => {
                return (
                  <div className="w-full">
                    <div className="flex gap-2">
                      <input
                        id="specialization"
                        placeholder="Add specialization and press Enter"
                        className={cn(
                          'flex h-11 w-full rounded-md border border-striv-muted/60 bg-white/60 px-3 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40 focus:outline-none transition-all duration-200',
                          'backdrop-blur-sm shadow-sm'
                        )}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = (e.target as HTMLInputElement).value;
                            if (val?.trim()) {
                              specArray.append(val.trim());
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {field.value?.map((val: string, i: number) => (
                        <div key={`${val}-${i}`} className="inline-flex items-center gap-2 rounded-full bg-striv-muted/20 px-3 py-1 text-sm text-gray-800">
                          <span>{val}</span>
                          <button type="button" onClick={() => specArray.remove(i)} className="ml-1 text-sm opacity-80" aria-label={`Remove ${val}`}>
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {errors.specialization && typeof (errors.specialization as any).message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.specialization as any).message}</p>}
                  </div>
                );
              }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Add specializations trainers provide (e.g., Strength, Yoga, HIIT)</p>
        </div>

        {/* Additional skills (dynamic) */}
        <div>
          <div className="flex items-center justify-between">
            <Label className="mb-2 block">Additional Skills</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => skillsArray.append('')}>
              Add skill
            </Button>
          </div>

          <div className="mt-2 grid gap-3">
            {skillsArray.fields.map((field, idx) => (
              <div key={field.id} className="flex gap-2">
                <Input placeholder="Skill (e.g., Nutrition Planning)" {...register(`additionalSkills.${idx}` as const)} />
                <Button type="button" variant="outline" size="sm" onClick={() => skillsArray.remove(idx)}>
                  Remove
                </Button>
              </div>
            ))}
            {skillsArray.fields.length === 0 && <p className="text-sm text-gray-500">No additional skills yet (optional).</p>}
            {errors.additionalSkills && typeof (errors.additionalSkills as any).message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.additionalSkills as any).message}</p>}
          </div>
        </div>

        {/* Years of experience */}
        <div>
          <Label htmlFor="years_of_experience" className="mb-2 block">Years of experience</Label>
          <Controller
            control={control}
            name="yearsOfExperience"
            render={({ field }) => (
              <Input
                id="years_of_experience"
                type="text"
                placeholder="e.g., 3"
                value={field.value ?? ''}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '');
                  if (cleaned === '') {
                    field.onChange(undefined);
                    return;
                  }
                  const num = Number(cleaned);
                  field.onChange(num);
                }}
              />
            )}
          />
          {errors.yearsOfExperience && typeof (errors.yearsOfExperience as any).message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.yearsOfExperience as any).message}</p>}
        </div>

        {/* Certificates (dynamic) */}
        <div>
          <div className="flex items-center justify-between">
            <Label className="mb-2 block">Certificates</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => certArray.append({ title: '', issuer: '', issuedDate: null, certificateImage: undefined })}>
              Add certificate
            </Button>
          </div>

          <div className="mt-3 space-y-4">
            {certArray.fields.map((field, idx) => (
              <div key={field.id} className="rounded-md border border-striv-muted/40 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <Label className="mb-2 block">Title</Label>
                    <Input placeholder="Certificate title" {...register(`certificates.${idx}.title` as const)} />
                    {errors.certificates && (errors.certificates as any)[idx]?.title && typeof (errors.certificates as any)[idx].title.message === 'string' && (
                      <p className="mt-1 text-sm text-red-600">{(errors.certificates as any)[idx].title.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-1">
                    <Label className="mb-2 block">Issuer</Label>
                    <Input placeholder="Issuer" {...register(`certificates.${idx}.issuer` as const)} />
                    {errors.certificates && (errors.certificates as any)[idx]?.issuer && typeof (errors.certificates as any)[idx].issuer.message === 'string' && (
                      <p className="mt-1 text-sm text-red-600">{(errors.certificates as any)[idx].issuer.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-1">
                    <Label className="mb-2 block">Issued date</Label>
                    <Input type="date" {...register(`certificates.${idx}.issuedDate` as const)} />
                    {errors.certificates && (errors.certificates as any)[idx]?.issuedDate && typeof (errors.certificates as any)[idx].issuedDate.message === 'string' && (
                      <p className="mt-1 text-sm text-red-600">{(errors.certificates as any)[idx].issuedDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <Label className="mb-2 block">Certificate image (optional)</Label>
                  <input type="file" accept={ACCEPTED_CERT_IMAGE_EXT} onChange={(e) => handleCertificateFileChange(idx, e.target.files)} className="block w-full text-sm text-gray-600" />
                  {errors.certificates && (errors.certificates as any)[idx]?.certificateImage && typeof (errors.certificates as any)[idx].certificateImage.message === 'string' && (
                    <p className="mt-1 text-sm text-red-600">{(errors.certificates as any)[idx].certificateImage.message}</p>
                  )}
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => certArray.remove(idx)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {certArray.fields.length === 0 && <p className="text-sm text-gray-500">No certificates added (optional)</p>}
          </div>
        </div>

        {/* Portfolio: bio + achievements + social links */}
        <div className="rounded-md border border-striv-muted/40 p-4">
          <Label className="mb-3 text-lg block">Portfolio</Label>

          <div className="mt-2">
            <Label htmlFor="bio" className="mb-2 block">
              Bio
            </Label>
            <textarea
              id="bio"
              rows={4}
              {...register('portfolio.bio' as const)}
              className={cn(
                'w-full rounded-md border border-striv-muted/60 bg-white/60 px-3 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40 transition-all duration-200',
                'backdrop-blur-sm shadow-sm'
              )}
              placeholder="Short bio about your training philosophy, experience and approach"
            />
            {errors.portfolio && (errors.portfolio as any).bio && typeof (errors.portfolio as any).bio.message === 'string' && (
              <p className="mt-1 text-sm text-red-600">{(errors.portfolio as any).bio.message}</p>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Label className="mb-2 block">Achievements</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => achievementsArray.append('')}>
                Add
              </Button>
            </div>

            <div className="mt-2 space-y-2">
              {achievementsArray.fields.map((f, i) => (
                <div key={f.id} className="flex gap-2">
                  <Input placeholder="Achievement description" {...register(`portfolio.achievements.${i}` as const)} />
                  <Button type="button" variant="outline" size="sm" onClick={() => achievementsArray.remove(i)}>
                    Remove
                  </Button>
                </div>
              ))}
              {achievementsArray.fields.length === 0 && <p className="text-sm text-gray-500">No achievements added (optional)</p>}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="website_link" className="mb-2 block">
                Website
              </Label>
              <Input id="website_link" placeholder="https://example.com" {...register('portfolio.socialLinks.website' as const)} />
              {errors.portfolio &&
                (errors.portfolio as any).socialLinks &&
                (errors.portfolio as any).socialLinks.website &&
                typeof (errors.portfolio as any).socialLinks.website.message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.portfolio as any).socialLinks.website.message}</p>}
            </div>

            <div>
              <Label htmlFor="instagram_link" className="mb-2 block">
                Instagram
              </Label>
              <Input id="instagram_link" placeholder="https://instagram.com/yourprofile" {...register('portfolio.socialLinks.instagram' as const)} />
              {errors.portfolio &&
                (errors.portfolio as any).socialLinks &&
                (errors.portfolio as any).socialLinks.instagram &&
                typeof (errors.portfolio as any).socialLinks.instagram.message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.portfolio as any).socialLinks.instagram.message}</p>}
            </div>

            <div>
              <Label htmlFor="youtube_link" className="mb-2 block">
                YouTube
              </Label>
              <Input id="youtube_link" placeholder="https://youtube.com/..." {...register('portfolio.socialLinks.youtube' as const)} />
              {errors.portfolio &&
                (errors.portfolio as any).socialLinks &&
                (errors.portfolio as any).socialLinks.youtube &&
                typeof (errors.portfolio as any).socialLinks.youtube.message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.portfolio as any).socialLinks.youtube.message}</p>}
            </div>

            <div>
              <Label htmlFor="linkedIn_link" className="mb-2 block">
                LinkedIn
              </Label>
              <Input id="linkedIn_link" placeholder="https://linkedin.com/in/..." {...register('portfolio.socialLinks.linkedin' as const)} />
              {errors.portfolio &&
                (errors.portfolio as any).socialLinks &&
                (errors.portfolio as any).socialLinks.linkedin &&
                typeof (errors.portfolio as any).socialLinks.linkedin.message === 'string' && <p className="mt-1 text-sm text-red-600">{(errors.portfolio as any).socialLinks.linkedin.message}</p>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onPrev}>
            Previous
          </Button>
          <Button type="submit" disabled={loading}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfessionalInfoForm;