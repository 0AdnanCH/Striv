export const Gender = {
  MALE: 'male',
  FEMALE: 'female'
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];