import { z } from 'zod';
import { WeekDay } from '../constants/enums.constant';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';
import { TIME_24H_REGEX } from '../constants/regex.constant';

export const availabilitySchema = z
  .object({
    day: z.enum(WeekDay, RESPONSE_MESSAGES.INVALID_CREDENTIALS),

    startTime: z.string().regex(TIME_24H_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS),

    endTime: z.string().regex(TIME_24H_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
  })
  .refine(
    (data) => {
      const [sh, sm] = data.startTime.split(':').map(Number);
      const [eh, em] = data.endTime.split(':').map(Number);

      return sh * 60 + sm < eh * 60 + em;
    },
    {
      error: RESPONSE_MESSAGES.INVALID_CREDENTIALS,
      path: ['endTime']
    }
  );

export const trainerWorkInfoSchema = z.object({
    oneToOnePrice: z
    .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(100000, RESPONSE_MESSAGES.INVALID_CREDENTIALS),

  groupSessionPrice: z
    .number(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .max(100000, RESPONSE_MESSAGES.INVALID_CREDENTIALS),

  availability: z.array(availabilitySchema).min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});