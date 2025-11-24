import { z } from 'zod';

export const trainerKycSchema = z.object({
  documentType: z.enum(['aadhaar', 'driving_license', 'pan_card'], 'Document type is required')
});

export type TrainerKycSchemaType = z.infer<typeof trainerKycSchema>;