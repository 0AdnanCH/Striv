import { ClientSession, ObjectId } from 'mongoose';
import { TrainerApplicationStatus } from '../../constants/enums.constant';
import { IRejectionDetails } from '../../types/trainer.type';
import { TrainerApplicationDocument } from '../../models/trainerApplication.model';
import { IBaseRepository } from './IBase.repository';

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// DTO for Admin Filters
export interface IApplicationFilter {
  search: string;
  page: number;
  limit: number;
  status?: TrainerApplicationStatus;
  sortBy?: string; // e.g., 'submissionDate'
  sortOrder?: 'asc' | 'desc';
}

export interface ITrainerApplicationRepository extends IBaseRepository<TrainerApplicationDocument> {
  // Trainer Side Methods
  findByTrainerId(trainerId: string | ObjectId): Promise<TrainerApplicationDocument | null>;

  // Admin Side Methods
  findWithAggregation(filter: IApplicationFilter): Promise<{ data: any[]; total: number }>;

  // Review Logic
  assignReviewer(
    applicationId: string | ObjectId, 
    reviewerId: string | ObjectId
  ): Promise<TrainerApplicationDocument | null>;
  
  updateStatus(
    id: string | ObjectId, 
    status: TrainerApplicationStatus, 
    reviewerId: string | ObjectId, 
    session?: ClientSession
  ): Promise<TrainerApplicationDocument | null>;

  rejectApplication(
    id: string | ObjectId, 
    rejectionDetails: IRejectionDetails, 
    reviewerId: string | ObjectId, 
    session?: ClientSession
  ): Promise<TrainerApplicationDocument | null>;

  ensureApplicationExists(
    trainerId: string | ObjectId, 
    initialStep: number
  ): Promise<TrainerApplicationDocument>;

  updateStep(
    trainerId: string | ObjectId, 
    newStep: number
  ): Promise<TrainerApplicationDocument | null>;

  submitApplication(trainerId: string | ObjectId): Promise<TrainerApplicationDocument | null>;
}