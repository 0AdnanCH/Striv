export interface IRejectionPayload {
  code?: string;
  reasonTemplate?: string;
  adminFeedback: string;
  failedSections: string[];
}