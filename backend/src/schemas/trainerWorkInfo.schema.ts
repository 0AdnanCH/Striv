import { z } from 'zod';

const TIME_24H_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const availabilitySchema = z
  .object({
    day: z.enum(DAYS, { message: 'Invalid day selected' }),

    startTime: z.string().regex(TIME_24H_REGEX, 'Start time must be in HH:MM (24h) format'),

    endTime: z.string().regex(TIME_24H_REGEX, 'End time must be in HH:MM (24h) format')
  })
  .refine(
    (data) => {
      const [sh, sm] = data.startTime.split(':').map(Number);
      const [eh, em] = data.endTime.split(':').map(Number);

      return sh * 60 + sm < eh * 60 + em;
    },
    {
      message: 'Start time must be earlier than end time',
      path: ['endTime']
    }
  );

export const trainerWorkInfoSchema = z.object({
    oneToOnePrice: z
    .number('Price for one-to-one session is required')
    .min(1, 'Price must be at least ₹1')
    .max(100000, 'Price is too high'),

  groupSessionPrice: z
    .number('Price for group session is required')
    .min(1, 'Price must be at least ₹1')
    .max(100000, 'Price is too high'),

  availability: z.array(availabilitySchema).min(1, 'You must specify at least one availability slot')
});

export type TrainerWorkInfoDto = z.infer<typeof trainerWorkInfoSchema>;