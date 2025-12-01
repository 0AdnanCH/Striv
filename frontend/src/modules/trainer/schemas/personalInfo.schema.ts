import { z } from 'zod';
import { NAME_REGEX } from '../../../constants/regex.constant';
import { Gender } from '../../../constants/gender.constant';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const personalInfoSchema = z.object({
  first_name: z
    .string({ error: (iss) => (iss.input === undefined ? 'First name is required' : 'First name can include letters, numbers, _ and -, but must start with a letter') })
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be at most 50 characters long')
    .regex(NAME_REGEX, 'First name can include letters, numbers, _ and -, but must start with a letter'),
  last_name: z
    .string({ error: (iss) => (iss.input === undefined ? 'Last name is required' : 'Last name can include letters, numbers, _ and -, but must start with a letter') })
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be at most 100 characters long')
    .regex(NAME_REGEX, 'Last name can include letters, numbers, _ and -, but must start with a letter'),
  gender: z.enum(Gender, "Gender must be either 'male' or 'female'"),
  age: z
    .number({ error: (iss) => (iss.input === undefined ? 'Age is required' : 'Age must be a whole number') })
    .int('Age must be a whole number')
    .gte(13, 'You must be at least 18 years old')
    .lte(120, 'Age must be 90 or below'),
  phone: z.string().regex(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' }),
  existingProfilePhotoUrl: z.string().nullable().optional(),
  profile_photo: z.any().optional(),
})
.superRefine((data, ctx) => {
  const file = data.profile_photo instanceof FileList && data.profile_photo.length
    ? data.profile_photo[0]
    : data.profile_photo instanceof File
    ? data.profile_photo
    : null;

  const hasExisting = !!data.existingProfilePhotoUrl;

  if (!file && !hasExisting) {
    ctx.addIssue({
      code: "custom",
      message: "Profile photo is required",
      path: ["profile_photo"],
    });
    return;
  }

  // If no new file, existing image is enough
  if (!file) return;

  // 2️⃣ Validate Size
  if (file.size > MAX_IMAGE_SIZE) {
    ctx.addIssue({
      code: "custom",
      message: "Image must be less than 2MB",
      path: ["profile_photo"],
    });
  }

  // 3️⃣ Validate Types
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: "custom",
      message: "Only JPEG, JPG, PNG, and WebP images are allowed",
      path: ["profile_photo"],
    });
  }
});


export type PersonalInfoType = z.infer<typeof personalInfoSchema>;