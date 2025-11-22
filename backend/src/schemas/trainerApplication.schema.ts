import { z } from 'zod';

const nameRegex = /^[A-Za-z][A-Za-z0-9_-]*$/;

const fileSchema = z
  .custom<Express.Multer.File>((val) => val && typeof val === 'object' && 'originalname' in val, { message: 'Invalid or missing profile photo' })
  .refine((file) => file.size <= 3 * 1024 * 1024, {
    message: 'Profile photo must be under 3MB'
  })
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.mimetype), {
    message: 'Profile photo must be a JPG or PNG'
  });

export const TrainerRegistrationStep1Schema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(50).regex(nameRegex),
  last_name: z.string().min(2, 'Last name must be at least 2 characters').max(50).regex(nameRegex),
  gender: z.enum(['male', 'female'], 'Invalid Gender'),
  age: z.number().min(18, 'Trainers must be at least 18 years old').max(90, 'Age cannot exceed 80'),
  phone: z.string().min(10, 'Phone number must be at least 8 digits').max(10, 'Phone number cannot exceed 15 digits'),
  profile_photo: fileSchema
});

export type TrainerRegistrationStep1Input = z.infer<typeof TrainerRegistrationStep1Schema>;