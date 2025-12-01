export const DocumentType = {
  AADHAAR: 'aadhaar',
  DRIVING_LICENSE: 'driving_license',
  PAN_CARD: 'pan_card'
} as const;

export type DocumentTypeType = (typeof DocumentType)[keyof typeof DocumentType];