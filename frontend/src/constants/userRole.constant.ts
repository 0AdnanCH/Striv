export const UserRole = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
  CLIENT: 'client'
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];