import { Router } from 'express';
import multer from 'multer';
import { TrainerApplicationController } from '../controllers/implementation/trainerApplication.controller';
import { TrainerApplicationService } from '../services/implementation/trainerApplication.service';
import { FileService } from '../services/implementation/file.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { TrainerRepository } from '../repositories/implementation/trainer.repository';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import validate from '../middlewares/validation.middleware';
import { trainerPersonalInfoSchema } from '../schemas/trainerPersonalInfo.schema';
import { trainerProfessionalInfoSchema } from '../schemas/trainerProfessionalInfo.schema';
import { trainerWorkInfoSchema } from '../schemas/trainerWorkInfo.schema';
import { TrainerKycRepository } from '../repositories/implementation/trainerKyc.repository';
import { trainerKycSchema } from '../schemas/trainerIdentityInfo.schema';
import { validateCertificateImages, validateIdentityImages, validateProfilePhoto } from '../middlewares/validateImageFile.middleware';

const upload = multer({ storage: multer.memoryStorage() });

const trainerApplicationRouter = Router();

const userRepository = new UserRepository();
const fileRepository = new FileService();
const trainerRepository = new TrainerRepository();
const trainerKycRepository = new TrainerKycRepository();
const trainerApplicationService = new TrainerApplicationService(userRepository, trainerRepository, trainerKycRepository, fileRepository);
const trainerApplicationController = new TrainerApplicationController(trainerApplicationService);

trainerApplicationRouter.get(
  '/me',
  authenticate,
  authorizeRoles('client'),
  trainerApplicationController.getFullTrainerInfo.bind(trainerApplicationController)
);

trainerApplicationRouter.post(
  '/personal-info',
  authenticate,
  authorizeRoles('client'),
  upload.single('profile_photo'),
  validateProfilePhoto,
  validate(trainerPersonalInfoSchema),
  trainerApplicationController.submitPersonalInfo.bind(trainerApplicationController)
);

trainerApplicationRouter.post(
  '/professional-info',
  authenticate,
  authorizeRoles('client'),
  upload.array('certificates'),
  validateCertificateImages,
  validate(trainerProfessionalInfoSchema),
  trainerApplicationController.submitProfessionalInfo.bind(trainerApplicationController)
);

trainerApplicationRouter.post(
  '/work-info',
  authenticate,
  authorizeRoles('client'),
  validate(trainerWorkInfoSchema),
  trainerApplicationController.submitWorkInfo.bind(trainerApplicationController)
);

trainerApplicationRouter.post(
  '/identity',
  authenticate,
  authorizeRoles('client'),
  upload.fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 }
  ]),
  validateIdentityImages,
  validate(trainerKycSchema),
  trainerApplicationController.submitIdentityInfo.bind(trainerApplicationController)
);

export default trainerApplicationRouter;