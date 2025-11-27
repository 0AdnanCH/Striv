import { z } from 'zod';

export const trainerKycSchema = z.object({
  documentType: z.enum(['aadhaar', 'driving_license', 'pan_card'], 'Document type is required')
});