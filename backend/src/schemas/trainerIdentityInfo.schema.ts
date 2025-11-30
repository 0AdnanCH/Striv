import { z } from 'zod';
import { DocumentType } from '../constants/enums.constant';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';

export const trainerKycSchema = z.object({
  documentType: z.enum(DocumentType, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});