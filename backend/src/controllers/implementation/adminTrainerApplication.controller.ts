import { Request, Response, NextFunction } from 'express';
import { IAdminTrainerApplicationService } from '../../services/interface/IAdminTrainerApplication.service';
import { HTTP_STATUS } from '../../constants/httpStatus.constant';
import { GetApplicationsFilterDto } from '../../dtos/getTrainerApplications.dto'; 
import { TrainerApplicationStatus } from '../../constants/enums.constant';
import { RESPONSE_MESSAGES } from '../../constants/responseMessages.constant';
import { IAdminTrainerApplicationController } from '../interface/IAdminTrainerApplication.controller';
import { successResponse } from '../../utils/apiResponse.util';

export class AdminTrainerApplicationController implements IAdminTrainerApplicationController {
  
  constructor(
    private readonly _adminTrainerApplicationService: IAdminTrainerApplicationService
  ) {}

  /**
   * @desc    Get all trainer applications with pagination, search, and sort
   * @route   GET /api/admin/trainer-applications
   * @access  Private (Admin)
   */
  async getApplications (req: Request, res: Response, next: NextFunction): Promise<void> {
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
  };
}