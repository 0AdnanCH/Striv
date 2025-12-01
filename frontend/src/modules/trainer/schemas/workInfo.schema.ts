import { z } from 'zod';
import { TIME_24H_REGEX } from '../../../constants/regex.constant';
import { WeekDay } from '../constants/weekDay.constant';

export const availabilitySchema = z.object({
  day: z.enum(WeekDay, 'Invalid day selected'),

  startTime: z
    .string()
    .regex(TIME_24H_REGEX, "Start time must be in HH:MM (24h) format"),

  endTime: z
    .string()
    .regex(TIME_24H_REGEX, "End time must be in HH:MM (24h) format"),
})
.refine(
  (data) => {
    if (!TIME_24H_REGEX.test(data.startTime) || !TIME_24H_REGEX.test(data.endTime))
      return false;

    const [sh, sm] = data.startTime.split(":").map(Number);
    const [eh, em] = data.endTime.split(":").map(Number);

    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    return start < end; 
  },
  {
    message: "Start time must be earlier than end time",
    path: ["endTime"],
  }
);

export const workInfoSchema = z.object({
  oneToOnePrice: z
    .number('Price for one-to-one session is required')
    .min(1, 'Price must be at least ₹1')
    .max(100000, 'Price is too high'),

  groupSessionPrice: z
    .number('Price for group session is required')
    .min(1, 'Price must be at least ₹1')
    .max(100000, 'Price is too high'),

  availability: z.array(availabilitySchema).nonempty('At least one availability slot is required')
});

export type WorkInfoType = z.infer<typeof workInfoSchema>;