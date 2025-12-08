import { Types } from 'mongoose';

export interface IRejectionTemplate {
  // Unique code for the dropdown value (e.g., "ID_INVALID")
  code: string;

  // The specific, minimalistic message for the trainer
  message: string;

  // Helps to group reasons in the UI (Personal, Professional, Work, Identity)
  category: 'PERSONAL' | 'PROFESSIONAL' | 'WORK' | 'IDENTITY' | 'GENERAL';

  // Soft delete flag
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}