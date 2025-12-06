// Role Enum
export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  CLIENT = 'client'
}

// UserStatus Enum
export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked'
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google'
}

// Gender Enum
export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

// Weekday Enum
export enum WeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

// Status Enum
export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// KYC Document Type Enum
export enum DocumentType {
  AADHAAR = 'aadhaar',
  DRIVING_LICENSE = 'driving_license',
  PAN_CARD = 'pan_card'
}

export enum TrainerApplicationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED', // User completed all steps
  UNDER_REVIEW = 'UNDER_REVIEW', // Admin reviewing
  APPROVED = 'APPROVED', // Trainer is approved
  REJECTED = 'REJECTED', // Admin rejected
  REVISION_REQUIRED = 'REVISION_REQUIRED' // Admin wants corrections
}