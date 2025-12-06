import { z } from 'zod';
import { DocumentType } from '../constants/trainerDocType.constant';

const MAX_ID_IMAGE_SIZE = 2 * 1024 * 1024; 
const ACCEPTED_ID_IMAGE_TYPES: readonly string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

function getFileFromValue(val: any): File | null {
  if (!val) return null;
  if (val instanceof File) return val;
  if (typeof FileList !== 'undefined' && val instanceof FileList) {
    return val.length > 0 ? val.item(0) : null;
  }
  if (Array.isArray(val) && val.length > 0 && val[0] instanceof File) return val[0];
  return null;
}


export const identityInfoSchema = z
  .object({
    documentType: z.enum(DocumentType, 'Please select a valid document type'),

    frontImage: z.any(),

    backImage: z.any().optional(),
  })
  .superRefine((obj, ctx) => {
    // ensure frontImage exists and is a real file
    const hasFrontUrl = typeof obj.frontImage === 'string';
    const frontFile = getFileFromValue(obj.frontImage);
    if (!hasFrontUrl && !frontFile) {
      ctx.addIssue({
        code: 'custom',
        message: 'Front image is required',
        path: ['frontImage']
      });
    }

    // conditional: backImage required unless documentType is pan_card
      const hasBackUrl = typeof obj.backImage === 'string';
    const backFile = getFileFromValue(obj.backImage);
    if (obj.documentType !== DocumentType.PAN_CARD) {
      if(!hasBackUrl && !backFile) {
        ctx.addIssue({
          code: 'custom',
          message: 'Back image is required for the selected document type',
          path: ['backImage']
        });
      }
    }

    // If both files exist, also re-validate type/size (defensive)
    if (frontFile) {
      if (!ACCEPTED_ID_IMAGE_TYPES.includes(frontFile.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Front image must be jpeg, jpg, png or webp',
          path: ['frontImage']
        });
      }
      if (frontFile.size > MAX_ID_IMAGE_SIZE) {
        ctx.addIssue({
          code: 'too_big',
          maximum: MAX_ID_IMAGE_SIZE,
          inclusive: true,
          origin: 'file',
          message: `Front image must be less than ${MAX_ID_IMAGE_SIZE / (1024 * 1024)} MB`,
          path: ['frontImage']
        });
      }
    }

    if (backFile) {
      if (!ACCEPTED_ID_IMAGE_TYPES.includes(backFile.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Back image must be jpeg, jpg, png or webp',
          path: ['backImage']
        });
      }
      if (backFile.size > MAX_ID_IMAGE_SIZE) {
        ctx.addIssue({
          code: 'too_big',
          maximum: MAX_ID_IMAGE_SIZE,
          inclusive: true,
          origin: 'file',
          message: `Back image must be less than ${MAX_ID_IMAGE_SIZE / (1024 * 1024)} MB`,
          path: ['backImage']
        });
      }
    }
  });

export type IdentityInfoType = z.infer<typeof identityInfoSchema>;