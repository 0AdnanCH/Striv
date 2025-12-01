import { z } from 'zod';
import { NAME_REGEX } from '../constants/regex.constant';
import { Gender } from '../constants/gender.constant';


export const firstNameSchema = z
  .string({ error: (iss) => (iss.input === undefined ? 'First name is required' : 'First name can include letters, numbers, _ and -, but must start with a letter') })
  .min(2, 'First name must be at least 2 characters long')
  .max(50, 'First name must be at most 50 characters long')
  .regex(NAME_REGEX , 'First name can include letters, numbers, _ and -, but must start with a letter');
export const lastNameSchema = z
  .string({ error: (iss) => (iss.input === undefined ? 'Last name is required' : 'Last name can include letters, numbers, _ and -, but must start with a letter') })
  .min(2, 'Last name must be at least 2 characters long')
  .max(50, 'Last name must be at most 100 characters long')
  .regex(NAME_REGEX, 'Last name can include letters, numbers, _ and -, but must start with a letter');
export const genderSchema = z.enum(Gender, "Gender must be either 'male' or 'female'");
export const ageSchema = z
  .number({ error: (iss) => (iss.input === undefined ? 'Age is required' : 'Age must be a whole number') })
  .int('Age must be a whole number')
  .gte(13, 'You must be at least 13 years old')
  .lte(120, 'Age must be 120 or below');
export const heightSchema = z
  .number('Height must be a number')
  .min(1, 'Height must be greater than 0')
  .max(300, 'Height cannot exceed 300 cm');
export const weightSchema = z
  .number('Weight must be a number')
  .min(1, 'Weight must be greater than 0')
  .max(400, 'Weight cannot exceed 500 kg');