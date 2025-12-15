import { Request, Response, NextFunction } from 'express';
import { IAdminTrainerApplicationService } from '../../services/interface/IAdminTrainerApplication.service';
import { HTTP_STATUS } from '../../constants/httpStatus.constant';
import { GetApplicationsFilterDto } from '../../dtos/getTrainerApplications.dto'; 
import { TrainerApplicationStatus } from '../../constants/enums.constant';
import { RESPONSE_MESSAGES } from '../../constants/responseMessages.constant';
import { IAdminTrainerApplicationController } from '../interface/IAdminTrainerApplication.controller';
import { successResponse } from '../../utils/apiResponse.util';
import BadRequestError from '../../errors/badRequest.error';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { IRejectionPayload } from '../../dtos/adminTrainerApplicationRejection.dto';

export class AdminTrainerApplicationController implements IAdminTrainerApplicationController {
  constructor(private readonly _adminTrainerApplicationService: IAdminTrainerApplicationService) {}

  /**
   * @desc    Get all trainer applications with pagination, search, and sort
   * @route   GET /api/admin/trainer-applications
   * @access  Private (Admin)
   */
  async getApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: GetApplicationsFilterDto = {
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        search: req.query.search as string,
        status: req.query.status as TrainerApplicationStatus,
        sortBy: req.query.sortBy as 'submissionDate' | 'firstName' | 'email',
        sortOrder: req.query.sortOrder as 'asc' | 'desc'
      };

      const result = await this._adminTrainerApplicationService.listApplications(filters);

      successResponse(res, RESPONSE_MESSAGES.TRAINER_INFO_FETCHED_SUCCESS, result, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async getVerificationDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.NOT_FOUND,
          message: 'Application ID is required',
          logging: false
        });
      }

      const data = await this._adminTrainerApplicationService.getTrainerApplicationDetails(id);

      successResponse(res, 'Trainer verification details fetched successfully', data, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/trainer/application/:id/approve
   * Secured Endpoint (Admin Only)
   */
  async approveApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      // Ideally, your auth middleware populates req.user.id
      const adminId = req.user?.id;

      if (!id) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: 'Application ID is required',
          logging: false,
        });
      }
      if (!adminId) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: 'Unauthorized: Admin ID missing',
          logging: false
        });
      }

      await this._adminTrainerApplicationService.approveApplication(id, adminId);

      successResponse(
        res, 
        'Trainer application approved and user promoted successfully.', 
        null, 
        HTTP_STATUS.OK
      );
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * PATCH /admin/trainer/application/:id/reject
   * Secured Endpoint (Admin Only)
   * @desc Rejects an application and provides feedback for changes
   */
  async rejectApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // The body should match the structure sent from the frontend (feedback object)
      const { feedback } = req.body as { feedback: IRejectionPayload }; 
      const adminId = req.user?.id;

      if (!id) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: 'Application ID is required',
          logging: false,
        });
      }

      if (!adminId) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: 'Unauthorized: Admin ID missing',
          logging: false
        });
      }

      if (!feedback || !feedback.adminFeedback) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: 'Rejection feedback is required',
          logging: false
        });
      }

      await this._adminTrainerApplicationService.rejectApplication(id, feedback, adminId);

      successResponse(
        res, 
        'Trainer application rejected and changes requested successfully.', 
        null, 
        HTTP_STATUS.OK
      );
    } catch (error: any) {
      next(error);
    }
  }
}