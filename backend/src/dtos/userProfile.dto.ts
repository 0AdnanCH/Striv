import { z } from "zod";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.constants";

const nameRegex = /^[A-Za-z][A-Za-z0-9_-]*$/;

export interface UserProfileDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
}

export const updateUserProfileSchema = z.object({
  first_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .trim()
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(nameRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  last_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .trim()
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(nameRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  gender: z.enum(['male', 'female'], RESPONSE_MESSAGES.INVALID_CREDENTIALS).optional(),
  age: z.number(RESPONSE_MESSAGES.INVALID_CREDENTIALS).int().min(13, RESPONSE_MESSAGES.INVALID_CREDENTIALS).max(120, RESPONSE_MESSAGES.INVALID_CREDENTIALS).optional(),
  height: z.number(RESPONSE_MESSAGES.INVALID_CREDENTIALS).min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS).max(300, RESPONSE_MESSAGES.INVALID_CREDENTIALS).optional(),
  weight: z.number(RESPONSE_MESSAGES.INVALID_CREDENTIALS).min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS).max(500, RESPONSE_MESSAGES.INVALID_CREDENTIALS).optional()
});

export type UpdateUserProfileDto = z.infer<typeof updateUserProfileSchema>;