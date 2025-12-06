export const TrainerApplicationStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REVISION_REQUIRED: 'REVISION_REQUIRED'
} as const;

export type TrainerApplicationStatusType = (typeof TrainerApplicationStatus)[keyof typeof TrainerApplicationStatus];