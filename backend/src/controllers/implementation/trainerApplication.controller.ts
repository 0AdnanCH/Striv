import { Response, NextFunction } from 'express';
import { ITrainerApplicationController } from '../interface/ITrainerApplication.controller';
import { ITrainerApplicationService } from '../../services/interface/ITrainerApplication.service';
import { TrainerRegistrationStep1Dto } from '../../dtos/trainerApplication.dto'; 
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/apiResponse.util';
import { HTTP_STATUS } from '../../constants/httpStatus.constants';
import { TrainerProfessionalInfoDto } from '../../schemas/trainerProfessionalInfo.schema';

export class TrainerApplicationController implements ITrainerApplicationController {
  constructor(private readonly _trainerApplicationService: ITrainerApplicationService) {}

  async submitPersonalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const payload: TrainerRegistrationStep1Dto = req.body;

      if (!userId) return;

      if (req.file) {
        payload.profile_photo = req.file;
      }

      const { message } = await this._trainerApplicationService.submitPersonalInfo(userId, payload);

      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  };

  async submitProfessionalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const payload: TrainerProfessionalInfoDto = req.body;

      const certificateFiles = req.files as Express.Multer.File[] | undefined;

      const { message } = await this._trainerApplicationService.submitProfessionalInfo(userId, payload, certificateFiles);

      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }
}