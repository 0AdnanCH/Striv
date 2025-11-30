import { Response, NextFunction } from 'express';
import { ITrainerApplicationController } from '../interface/ITrainerApplication.controller';
import { ITrainerApplicationService } from '../../services/interface/ITrainerApplication.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/apiResponse.util';
import { HTTP_STATUS } from '../../constants/httpStatus.constant';
import { UploadedFile } from '../../types/trainer.type';

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
      if (!userId) return;

      const profile_photo = req.file as UploadedFile | undefined;

      const { message, data } = await this._trainerApplicationService.submitPersonalInfo(userId, req.body, profile_photo);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async submitProfessionalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const certificateFiles = req.files as UploadedFile[] | undefined;

      const { message, data } = await this._trainerApplicationService.submitProfessionalInfo(userId, req.body, certificateFiles);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async submitWorkInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const { message, data } = await this._trainerApplicationService.submitWorkInfo(userId, req.body);

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

      const frontImage = files?.frontImage?.[0] as UploadedFile;
      const backImage = files?.backIMage?.[0] as UploadedFile;

      const { message, data } = await this._trainerApplicationService.submitIdentityInfo(userId, req.body, frontImage, backImage);

      successResponse(res, message, data, HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}