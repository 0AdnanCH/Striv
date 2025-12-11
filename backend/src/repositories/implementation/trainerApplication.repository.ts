import { ObjectId, PipelineStage } from 'mongoose';
import { IApplicationFilter, ITrainerApplicationRepository } from '../interface/ITrainerApplication.repository';
import { BaseRepository } from '../base.repository';
import { TrainerApplication, TrainerApplicationDocument } from '../../models/trainerApplication.model';
import { IRejectionDetails, ITrainerApplication } from '../../types/trainer.type';
import { TrainerApplicationStatus } from '../../constants/enums.constant';
import { Trainer } from '../../models/trainer.model';
import { User } from '../../models/user.model';

export class TrainerApplicationRepository extends BaseRepository<TrainerApplicationDocument> implements ITrainerApplicationRepository {
  constructor() {
    super(TrainerApplication);
  }

  /**
   * Creates a new application or updates an existing one for a trainer.
   * Uses 'upsert' logic to ensure 1:1 relationship is maintained.
   */
  async createOrUpdate(trainerId: string, data: Partial<ITrainerApplication>): Promise<TrainerApplicationDocument> {
    return this.model.findOneAndUpdate({ trainerId }, { $set: data }, { new: true, upsert: true, setDefaultsOnInsert: true }).exec();
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
    return this.model
      .findById(id)
      .populate('trainerId') // Fetches the actual Trainer Data
      .populate('reviewerId', 'name email') // Fetches Admin info
      .exec();
  }

  /**
   * Advanced FindAll with Pagination and Filtering.
   * Essential for a scalable Admin Dashboard.
   */
  async findWithAggregation(filter: IApplicationFilter): Promise<{ data: any[]; total: number }> {
    const { page, limit, search, status, sortBy, sortOrder } = filter;
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [];

    // ---------------------------------------------------------
    // 1. FIRST LOOKUP: Join Application -> Trainer
    // Goal: Get the 'userId' stored inside the Trainer document
    // ---------------------------------------------------------
    pipeline.push({
      $lookup: {
        from: Trainer.collection.name, // "trainers"
        localField: 'trainerId',
        foreignField: '_id',
        as: 'trainer_doc'
      }
    });

    pipeline.push({
      $unwind: {
        path: '$trainer_doc',
        preserveNullAndEmptyArrays: true // Safety: Don't lose app if trainer doc is missing
      }
    });

    // ---------------------------------------------------------
    // 2. SECOND LOOKUP: Join Trainer -> User
    // Goal: Get the Name/Email/Photo using the 'userId' from step 1
    // ---------------------------------------------------------
    pipeline.push({
      $lookup: {
        from: User.collection.name, // "users"
        localField: 'trainer_doc.userId', // <--- logic is here
        foreignField: '_id',
        as: 'user_details'
      }
    });

    pipeline.push({
      $unwind: {
        path: '$user_details',
        preserveNullAndEmptyArrays: true
      }
    });

    // ---------------------------------------------------------
    // 3. FLATTEN & PROJECT
    // Optimization: Create a clean structure for Searching/Sorting
    // This makes the subsequent stages much cleaner.
    // ---------------------------------------------------------
    pipeline.push({
      $project: {
        _id: 1,
        status: 1,
        submittedAt: '$submissionDate', // or createdAt
        currentStep: '$applicationStep',
        // Extract User Info
        firstName: '$user_details.first_name',
        lastName: '$user_details.last_name',
        email: '$user_details.email',
        profilePhoto: '$user_details.profile_photo',
        fullName: { $concat: ['$user_details.first_name', ' ', '$user_details.last_name'] }
      }
    });

    // ---------------------------------------------------------
    // 4. FILTERING (Match)
    // ---------------------------------------------------------

    // A. Status Filter
    if (status) {
      pipeline.push({
        $match: { status: status }
      });
    }

    // B. Text Search (Now easier because we flattened the data)
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      pipeline.push({
        $match: {
          $or: [{ fullName: searchRegex }, { email: searchRegex }]
        }
      });
    }

    // ---------------------------------------------------------
    // 5. SORTING
    // ---------------------------------------------------------
    const sortDir = sortOrder === 'desc' ? -1 : 1;
    let sortStage: any = {};

    if (sortBy === 'firstName') {
      sortStage['firstName'] = sortDir;
    } else if (sortBy === 'email') {
      sortStage['email'] = sortDir;
    } else {
      sortStage['submittedAt'] = sortDir; // Default sort
    }

    pipeline.push({ $sort: sortStage });

    // ---------------------------------------------------------
    // 6. PAGINATION (Facet)
    // ---------------------------------------------------------
    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: limit }]
      }
    });

    // Execute
    const result = await this.model.aggregate(pipeline);

    const data = result[0].data;
    const total = result[0].metadata[0]?.total || 0;

    return { data, total };
  }

  /**
   * Locks the application for a specific admin to avoid race conditions.
   * Changes status to UNDER_REVIEW and sets reviewerId.
   */
  async assignReviewer(applicationId: string | ObjectId, reviewerId: string | ObjectId): Promise<TrainerApplicationDocument | null> {
    return this.model
      .findByIdAndUpdate(
        applicationId,
        {
          $set: {
            status: TrainerApplicationStatus.UNDER_REVIEW,
            reviewerId: reviewerId,
            reviewedAt: new Date()
          }
        },
        { new: true }
      )
      .exec();
  }

  /**
   * Handles the final approval or rejection logic.
   * Updates status, timestamps, and optionally rejection details.
   */
  async updateStatus(applicationId: string, status: TrainerApplicationStatus, rejectionDetails?: IRejectionDetails): Promise<TrainerApplicationDocument | null> {
    const updateData: any = {
      status,
      reviewedAt: new Date()
    };

    // If rejected or revision requested, add the details
    if (rejectionDetails) {
      updateData.rejectionDetails = rejectionDetails;
    }

    return this.model.findByIdAndUpdate(applicationId, { $set: updateData }, { new: true }).exec();
  }

  async ensureApplicationExists(trainerId: string | ObjectId, initialStep: number): Promise<TrainerApplicationDocument> {
    return this.model
      .findOneAndUpdate(
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
      )
      .exec();
  }

  async updateStep(trainerId: string | ObjectId, newStep: number): Promise<TrainerApplicationDocument | null> {
    return this.model.findOneAndUpdate({ trainerId }, { $set: { applicationStep: newStep } }, { new: true }).exec();
  }

  async submitApplication(trainerId: string | ObjectId): Promise<TrainerApplicationDocument | null> {
    return this.model
      .findOneAndUpdate(
        { trainerId: trainerId },
        {
          $set: {
            status: TrainerApplicationStatus.COMPLETED,
            submissionDate: new Date()
          }
        },
        { new: true }
      )
      .exec();
  }
}