import { z } from 'zod';
import { NAME_REGEX, REGEX_LOWERCASE, REGEX_NO_WHITESPACE, REGEX_NUMBER, REGEX_SPECIAL_CHAR, REGEX_UPPERCASE } from '../../../constants/regex.constant';
import { Gender } from '../../../constants/gender.constant';

export const signupSchema = z
  .object({
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
    email: z.email('Please enter a valid email address'),
    password: z
      .string('Password is required')
      .min(8, 'New password must be at least 8 characters')
      .regex(REGEX_NO_WHITESPACE, 'Must not contain any spaces')
      .regex(REGEX_UPPERCASE, 'Must include at least one uppercase letter')
      .regex(REGEX_LOWERCASE, 'Must include at least one lowercase letter')
      .regex(REGEX_NUMBER, 'Must include at least one number')
      .regex(REGEX_SPECIAL_CHAR, 'Must include at least one special character'),
    confirm_password: z.string('Confirm your password'),
    gender: z.enum(Gender, "Gender must be either 'male' or 'female'"),
    age: z
      .number({ error: (iss) => (iss.input === undefined ? 'Age is required' : 'Age must be a whole number') })
      .int('Age must be a whole number')
      .gte(13, 'You must be at least 13 years old')
      .lte(120, 'Age must be 120 or below')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;