import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constants';

const nameRegex = /^[A-Za-z][A-Za-z0-9_-]*$/;
const passwordRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}\[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}\[\]~]{8,}$/;

export const signupSchema = z.object({
  first_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(nameRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  last_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(nameRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  email: z
    .email(RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  password: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(passwordRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  gender: z
    .enum(['male', 'female'], RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  age: z
    .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .int(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .gte(13, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .lte(120, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});

export const otpSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  otp: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .length(6, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(/^\d{6}$/, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
});

export const emailSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});

export const adminSigninSchema = z.object({
  email: z.email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' })
});

export type AdminSigninDto = z.infer<typeof adminSigninSchema>;