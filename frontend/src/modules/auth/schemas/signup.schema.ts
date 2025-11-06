import { z } from 'zod';

const nameRegex = /^[A-Za-z][A-Za-z0-9_-]*$/;
const passwordRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}\[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}\[\]~]{8,}$/;

export const signupSchema = z
  .object({
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
    email: z.email('Please enter a valid email address'),
    password: z
      .string({ error: (iss) => (iss.input === undefined ? 'Password is required' : 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol') })
      .regex(passwordRegex, 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol'),
    confirm_password: z.string('Confirm your password'),
    gender: z.enum(['male', 'female'], "Gender must be either 'male' or 'female'"),
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

export type SignupSchema= z.infer<typeof signupSchema>;