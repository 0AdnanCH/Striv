import { z } from 'zod';

export const certificateSchema = z.object({
  title: z.string().min(1, 'Certificate title is required'),
  issuer: z.string().min(1, 'Certificate issuer is required'),
  issuedDate: z.union([z.string().transform((val) => new Date(val)), z.null()]).optional(),
});

export const socialLinksSchema = z.object({
  website: z.url().nullable().optional(),
  instagram: z.url().nullable().optional(),
  youtube: z.url().nullable().optional(),
  linkedin: z.url().nullable().optional()
});

export const portfolioSchema = z.object({
  bio: z.string().min(1, 'Bio is required'),
  achievements: z.array(z.string()).optional(),
  socialLinks: socialLinksSchema.optional()
});

export const trainerProfessionalInfoSchema = z.object({
  specialization: z.array(z.string().min(1)).nonempty('At least one specialization is required'),

  additionalSkills: z.array(z.string()).optional(),

  yearsOfExperience: z
    .preprocess(val => Number(val), z
      .number('Years of experience must be a whole number')
      .min(1, 'Years of experience cannot be negative')
    ),

  certificates: z.array(certificateSchema).optional(),

  portfolio: portfolioSchema
});

export type TrainerProfessionalInfoDto = z.infer<typeof trainerProfessionalInfoSchema>;