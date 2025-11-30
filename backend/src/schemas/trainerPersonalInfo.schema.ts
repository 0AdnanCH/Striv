import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';
import { Gender } from '../constants/enums.constant';
import { NAME_REGEX, PHONE_NO_REGEX } from '../constants/regex.constant';

export const trainerPersonalInfoSchema = z.object({
  first_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(NAME_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  last_name: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(2, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(50, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(NAME_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  age: z
    .preprocess((val) => Number(val), 
      z
      .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
      .min(18, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
      .max(90, RESPONSE_MESSAGES.INVALID_CREDENTIALS)),
  gender: z
    .enum(Gender, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  phone: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(PHONE_NO_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(10, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(10, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});