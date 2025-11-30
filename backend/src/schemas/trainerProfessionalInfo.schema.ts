import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';

export const certificateSchema = z.object({
  title: z.string().min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  issuer: z.string().min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  issuedDate: z.union([z.string().transform((val) => new Date(val)), z.null()]).optional()
});

export const socialLinksSchema = z.object({
  website: z.url().nullable().optional(),
  instagram: z.url().nullable().optional(),
  youtube: z.url().nullable().optional(),
  linkedin: z.url().nullable().optional()
});

export const portfolioSchema = z.object({
  bio: z.string().min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  achievements: z.array(z.string()).optional(),
  socialLinks: socialLinksSchema.optional()
});

export const trainerProfessionalInfoSchema = z.object({
  specialization: z.array(z.string().min(1)).nonempty(RESPONSE_MESSAGES.INVALID_CREDENTIALS),

  additionalSkills: z.array(z.string()).optional(),

  yearsOfExperience: z
    .preprocess(val => Number(val), z
      .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
      .min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    ),

  certificates: z.array(certificateSchema).optional(),

  portfolio: portfolioSchema
});