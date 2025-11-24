import { z } from 'zod';

const nameRegex = /^[A-Za-z][A-Za-z0-9_-]*$/;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const personalInfoSchema = z.object({
  first_name: z
    .string({ error: (iss) => (iss.input === undefined ? 'First name is required' : 'First name can include letters, numbers, _ and -, but must start with a letter') })
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be at most 50 characters long')
    .regex(nameRegex, 'First name can include letters, numbers, _ and -, but must start with a letter'),
  last_name: z
    .string({ error: (iss) => (iss.input === undefined ? 'Last name is required' : 'Last name can include letters, numbers, _ and -, but must start with a letter') })
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be at most 100 characters long')
    .regex(nameRegex, 'Last name can include letters, numbers, _ and -, but must start with a letter'),
  gender: z.enum(['male', 'female'], "Gender must be either 'male' or 'female'"),
  age: z
    .number({ error: (iss) => (iss.input === undefined ? 'Age is required' : 'Age must be a whole number') })
    .int('Age must be a whole number')
    .gte(13, 'You must be at least 18 years old')
    .lte(120, 'Age must be 90 or below'),
  phone: z.string().regex(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' }),
  profile_photo: z
    .any()
    .refine((file) => {
      if (!file) return false;

      if (file instanceof FileList) {
        return file.length === 1; // must select EXACTLY 1 file
      }

      if (file instanceof File) return true;

      return false;
    }, 'Profile photo is required')
    .refine((file) => {
      const f = file instanceof File ? file : file instanceof FileList && file.length ? file[0] : null;
      if (!f) return false;
      return f.size <= MAX_IMAGE_SIZE;
    }, 'Image must be less than 2MB')
    .refine((file) => {
      const f = file instanceof File ? file : file instanceof FileList && file.length ? file[0] : null;
      if (!f) return false;
      return ACCEPTED_IMAGE_TYPES.includes(f.type);
    }, 'Only JPEG, PNG, and WebP images are allowed')
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;