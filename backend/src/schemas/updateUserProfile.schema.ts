import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';
import { Gender } from '../constants/enums.constant';
import { NAME_REGEX } from '../constants/regex.constant';

export const updateUserProfileSchema = z.object({
  first_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .trim()
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(NAME_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  last_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .trim()
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(NAME_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  gender: z
    .enum(Gender, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  age: z
    .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .int()
    .min(13, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(120, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  height: z
    .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(300, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional(),
  weight: z
    .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(500, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .optional()
});