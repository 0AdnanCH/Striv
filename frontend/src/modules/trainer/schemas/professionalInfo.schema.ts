import { z } from 'zod';

const MAX_CERTIFICATE_IMAGE_SIZE = 3 * 1024 * 1024; 
const ACCEPTED_CERTIFICATE_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const optionalURL = z
  .string()
  .trim()
  .transform(val => val === "" ? null : val)
  .nullable()
  .refine(val => val === null || val === undefined || /^https?:\/\/.+/.test(val), "Invalid URL");

export const socialLinksSchema = z.object({
  website: optionalURL.optional(),
  instagram: optionalURL.optional(),
  youtube: optionalURL.optional(),
  linkedin: optionalURL.optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required").trim(),
  issuer: z.string().min(1, "Certificate issuer is required").trim(),

  issuedDate: z
    .union([
      z
      .string()
      .min(1, "Issued date is required"),
      z
      .null(),
    ])
    .optional(),

  certificateImage: z
    .any()
    .refine((file) => {
      if (!file) return true; // optional
      if (file instanceof File) return true;
      if (file instanceof FileList && file.length === 1) return true;
      return false;
    }, "Certificate image must be a valid file")
    .refine((file) => {
      if (!file) return true;
      const f =
        file instanceof File
          ? file
          : file instanceof FileList && file.length
          ? file[0]
          : null;
      if (!f) return true;

      return f.size <= MAX_CERTIFICATE_IMAGE_SIZE;
    }, "Certificate image must be less than 3MB")
    .refine((file) => {
      if (!file) return true;
      const f =
        file instanceof File
          ? file
          : file instanceof FileList && file.length
          ? file[0]
          : null;
      if (!f) return true;

      return ACCEPTED_CERTIFICATE_IMAGE_TYPES.includes(f.type);
    }, "Only JPEG, PNG or WebP image formats are allowed"),
});

export const portfolioSchema = z.object({
  bio: z.string().min(1, 'Bio is required').trim(),
  achievements: z
    .array(
      z
        .string()
        .trim()
    )
    .optional(),
  socialLinks: socialLinksSchema.optional()
});


export const professionalInfoSchema = z.object({
  specialization: z
    .array(
      z
      .string()
      .regex(/^[A-Za-z\s]+$/, 'Achievement must contain only letters and spaces')
      .min(1, "Specialization cannot be empty"))
    .nonempty("At least one specialization is required"),

  additionalSkills: z
    .array(
      z
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, 'Achievement must contain only letters and spaces'))
    .optional(),

  yearsOfExperience: z
    .number("Years of experience is required")
    .min(0, "Years of experience cannot be negative")
    .max(70, "Years of experience is too high"),

  certificates: z.array(certificateSchema).optional(),

  portfolio: portfolioSchema,
});

export type ProfessionalInfoType = z.infer<typeof professionalInfoSchema>;