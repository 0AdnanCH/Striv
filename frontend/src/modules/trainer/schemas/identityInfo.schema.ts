import { z } from 'zod';

const MAX_ID_IMAGE_SIZE = 3 * 1024 * 1024; 
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
    documentType: z.enum(['aadhar', 'driving_license', 'pan_card'], 'Please select a valid document type'),

    frontImage: z
      .any()
      .refine((v) => {
        const f = getFileFromValue(v);
        return f instanceof File;
      }, 'Front image is required')
      .refine((v) => {
        const f = getFileFromValue(v);
        if (!f) return true;
        return ACCEPTED_ID_IMAGE_TYPES.includes(f.type);
      }, 'Front image must be jpeg, jpg, png or webp')
      .refine((v) => {
        const f = getFileFromValue(v);
        if (!f) return true;
        return f.size <= MAX_ID_IMAGE_SIZE;
      }, `Front image must be less than ${MAX_ID_IMAGE_SIZE / (1024 * 1024)} MB`),

    backImage: z
      .any()
      .optional()
      .refine((v) => {
        const f = getFileFromValue(v);
        if (!f) return true;
        return ACCEPTED_ID_IMAGE_TYPES.includes(f.type);
      }, 'Back image must be jpeg, jpg, png or webp')
      .refine((v) => {
        const f = getFileFromValue(v);
        if (!f) return true;
        return f.size <= MAX_ID_IMAGE_SIZE;
      }, `Back image must be less than ${MAX_ID_IMAGE_SIZE / (1024 * 1024)} MB`)
  })
  .superRefine((obj, ctx) => {
    // ensure frontImage exists and is a real file
    const front = getFileFromValue(obj.frontImage);
    if (!front) {
      ctx.addIssue({
        code: 'custom',
        message: 'Front image is required',
        path: ['frontImage']
      });
    }

    // conditional: backImage required unless documentType is pan_card
    const back = getFileFromValue(obj.backImage);
    if (obj.documentType !== 'pan_card' && !back) {
      ctx.addIssue({
        code: 'custom',
        message: 'Back image is required for the selected document type',
        path: ['backImage']
      });
    }

    // If both files exist, also re-validate type/size (defensive)
    if (front) {
      if (!ACCEPTED_ID_IMAGE_TYPES.includes(front.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Front image must be jpeg, jpg, png or webp',
          path: ['frontImage']
        });
      }
      if (front.size > MAX_ID_IMAGE_SIZE) {
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

    if (back) {
      if (!ACCEPTED_ID_IMAGE_TYPES.includes(back.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Back image must be jpeg, jpg, png or webp',
          path: ['backImage']
        });
      }
      if (back.size > MAX_ID_IMAGE_SIZE) {
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