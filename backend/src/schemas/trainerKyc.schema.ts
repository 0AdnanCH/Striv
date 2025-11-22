import { z } from 'zod';
import { KycDocumentType } from '../types/trainer.type'; 

export const trainerKycSchema = z.object({
  documentType: z.enum(KycDocumentType, 'Document type is required'),
  frontImage: z.any().refine((file) => !!file, {
    error: 'Front image is required'
  }),

  backImage: z.any().optional()
});

export type TrainerKycSchemaType = z.infer<typeof trainerKycSchema>;