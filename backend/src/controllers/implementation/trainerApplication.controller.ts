import { Response, NextFunction } from 'express';
import { ITrainerApplicationController } from '../interface/ITrainerApplication.controller';
import { ITrainerApplicationService } from '../../services/interface/ITrainerApplication.service';
import { TrainerKycDto, TrainerRegistrationStep1Dto, TrainerWorkInfoDto } from '../../dtos/trainerApplication.dto'; 
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/apiResponse.util';
import { HTTP_STATUS } from '../../constants/httpStatus.constants';
import { TrainerProfessionalInfoDto } from '../../schemas/trainerProfessionalInfo.schema';

export class TrainerApplicationController implements ITrainerApplicationController {
  constructor(private readonly _trainerApplicationService: ITrainerApplicationService) {}

  async getFullTrainerInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const { message, data } = await this._trainerApplicationService.getFullTrainerInfo(userId);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  async submitPersonalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const payload: TrainerRegistrationStep1Dto = req.body;

      if (!userId) return;

      if (req.file) {
        payload.profile_photo = req.file;
      }

      const { message, data } = await this._trainerApplicationService.submitPersonalInfo(userId, payload);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async submitProfessionalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const payload: TrainerProfessionalInfoDto = req.body;

      const certificateFiles = req.files as Express.Multer.File[] | undefined;

      const { message, data } = await this._trainerApplicationService.submitProfessionalInfo(userId, payload, certificateFiles);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async submitWorkInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const payload: TrainerWorkInfoDto = req.body;

      const { message, data } = await this._trainerApplicationService.submitWorkInfo(userId, payload);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async submitIdentityInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const payload: TrainerKycDto = {
        ...req.body,
        frontImage: files?.frontImage?.[0],
        backImage: files?.backImage?.[0]
      };

      const { message, data } = await this._trainerApplicationService.submitIdentityInfo(userId, payload);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}