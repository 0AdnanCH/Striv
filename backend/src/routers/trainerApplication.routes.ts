import { Router } from 'express';
import multer from 'multer';

import { TrainerApplicationController } from '../controllers/implementation/trainerApplication.controller';
import { TrainerApplicationService } from '../services/implementation/trainerApplication.service';
import { FileService } from '../services/implementation/file.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { TrainerRepository } from '../repositories/implementation/trainer.repository';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import validate from '../middlewares/validation.middleware';
import { TrainerRegistrationStep1Schema } from '../schemas/trainerApplication.schema';
import { trainerProfessionalInfoSchema } from '../schemas/trainerProfessionalInfo.schema';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

const userRepository = new UserRepository();
const fileRepository = new FileService();
const trainerRepository = new TrainerRepository();
const trainerApplicationService = new TrainerApplicationService(userRepository, trainerRepository, fileRepository);
const trainerApplicationController = new TrainerApplicationController(trainerApplicationService);

router.patch(
  '/personal-info', 
  authenticate, 
  authorizeRoles('client'), 
  upload.single('profile_photo'), 
  validate(TrainerRegistrationStep1Schema), 
  trainerApplicationController.submitPersonalInfo.bind(trainerApplicationController)
);

router.patch(
  '/professional-info',
  authenticate,
  authorizeRoles('client'),
  upload.array('certificates'),
  validate(trainerProfessionalInfoSchema),
  trainerApplicationController.submitProfessionalInfo
);

export default router;