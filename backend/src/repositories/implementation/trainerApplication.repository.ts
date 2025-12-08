import { Model, FilterQuery, ObjectId } from 'mongoose';
import { IApplicationFilter, IPaginatedResult, ITrainerApplicationRepository } from '../interface/ITrainerApplication.repository';
import { BaseRepository } from '../base.repository';
import { TrainerApplication, TrainerApplicationDocument } from '../../models/trainerApplication.model';
import { IRejectionDetails, ITrainerApplication } from '../../types/trainer.type';
import { TrainerApplicationStatus } from '../../constants/enums.constant';

export class TrainerApplicationRepository extends BaseRepository<TrainerApplicationDocument> implements ITrainerApplicationRepository {
  constructor() {
    super(TrainerApplication)
  }

  /**
   * Creates a new application or updates an existing one for a trainer.
   * Uses 'upsert' logic to ensure 1:1 relationship is maintained.
   */
  async createOrUpdate(trainerId: string, data: Partial<ITrainerApplication>): Promise<TrainerApplicationDocument> {
    return this.model.findOneAndUpdate(
      { trainerId },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).exec();
  }

  /**
   * Finds an application by Trainer ID.
   * Useful for the Trainer to see their own progress.
   */
  async findByTrainerId(trainerId: string): Promise<TrainerApplicationDocument | null> {
    return this.model.findOne({ trainerId }).exec();
  }

  /**
   * Finds an application by ID for Admin Review.
   * POPULATES the trainerId to get the actual Personal/Work info.
   */
  async findById(id: string): Promise<TrainerApplicationDocument | null> {
    return this.model.findById(id)
      .populate('trainerId') // Fetches the actual Trainer Data
      .populate('reviewerId', 'name email') // Fetches Admin info
      .exec();
  }

  /**
   * Advanced FindAll with Pagination and Filtering.
   * Essential for a scalable Admin Dashboard.
   */
  async findWithFilters(filter: IApplicationFilter): Promise<IPaginatedResult<TrainerApplicationDocument>> {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    // Build Query
    const query: FilterQuery<TrainerApplicationDocument> = {};
    if (filter.status) {
      query.status = filter.status;
    }

    // Determine Sort
    const sortField = filter.sortBy || 'submissionDate';
    const sortOrder = filter.sortOrder === 'asc' ? 1 : -1;

    // Execute Query and Count in parallel for performance
    const [data, total] = await Promise.all([
      this.model
        .find(query)
        .populate('trainerId', 'firstName lastName email profileImage') // Only fetch needed grid fields
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean() // Optimization: Returns POJO instead of Mongoose Doc (faster for lists)
        .exec(),
      this.model.countDocuments(query)
    ]);

    return {
      data: data as TrainerApplicationDocument[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Locks the application for a specific admin to avoid race conditions.
   * Changes status to UNDER_REVIEW and sets reviewerId.
   */
  async assignReviewer(applicationId: string | ObjectId, reviewerId: string | ObjectId): Promise<TrainerApplicationDocument | null> {
    return this.model.findByIdAndUpdate(
      applicationId,
      {
        $set: {
          status: TrainerApplicationStatus.UNDER_REVIEW,
          reviewerId: reviewerId,
          reviewedAt: new Date()
        }
      },
      { new: true }
    ).exec();
  }

  /**
   * Handles the final approval or rejection logic.
   * Updates status, timestamps, and optionally rejection details.
   */
  async updateStatus(
    applicationId: string, 
    status: TrainerApplicationStatus, 
    rejectionDetails?: IRejectionDetails
  ): Promise<TrainerApplicationDocument | null> {
    
    const updateData: any = {
      status,
      reviewedAt: new Date()
    };

    // If rejected or revision requested, add the details
    if (rejectionDetails) {
      updateData.rejectionDetails = rejectionDetails;
    }

    return this.model.findByIdAndUpdate(
      applicationId,
      { $set: updateData },
      { new: true }
    ).exec();
  }

  async ensureApplicationExists(trainerId: string | ObjectId, initialStep: number): Promise<TrainerApplicationDocument> {
    return this.model.findOneAndUpdate(
      { trainerId: trainerId }, 
      { 
        $setOnInsert: { 
          trainerId: trainerId,
          status: TrainerApplicationStatus.IN_PROGRESS,
          applicationStep: initialStep
        }
      },
      { 
        new: true,   
        upsert: true
      }
    ).exec();
  }

  async updateStep(trainerId: string | ObjectId, newStep: number): Promise<TrainerApplicationDocument | null> {
    return this.model.findOneAndUpdate(
      { trainerId },
      { $set: { applicationStep: newStep } },
      { new: true }
    ).exec();
  }

  async submitApplication(trainerId: string | ObjectId): Promise<TrainerApplicationDocument | null> {
    return this.model.findOneAndUpdate(
      { trainerId: trainerId },
      { 
        $set: { 
          status: TrainerApplicationStatus.COMPLETED,
          submissionDate: new Date()
        } 
      },
      { new: true }
    ).exec();
  }
}