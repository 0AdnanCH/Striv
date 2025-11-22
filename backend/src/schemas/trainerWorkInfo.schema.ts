import { z } from 'zod';

export const availabilitySchema = z
  .object({
    day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format. Use HH:MM'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format. Use HH:MM')
  })
  .refine((val) => val.startTime < val.endTime, { message: 'startTime must be before endTime'});

export const trainerWorkInfoSchema = z.object({
  pricing: z.object({
    oneToOne: z.number().min(0, 'Price cannot be negative'),
    groupSession: z.number().min(0, 'Price cannot be negative')
  }),

  availability: z.array(availabilitySchema).min(1, 'You must specify at least one availability slot')
});

export type TrainerWorkInfoDto = z.infer<typeof trainerWorkInfoSchema>;