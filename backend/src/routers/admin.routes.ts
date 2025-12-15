import express from 'express';
import { AdminController } from '../controllers/implementation/admin.controller';
import { AdminService } from '../services/implementation/admin.service';
import { AuthService } from '../services/implementation/auth.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { OtpRepository } from '../repositories/implementation/otp.repository';
import { PasswordResetTokenRepository } from '../repositories/implementation/passwordResetToken.repository';
import validate from '../middlewares/validation.middleware';
import { AdminUserService } from '../services/implementation/adminUser.service';
import { AdminUserController } from '../controllers/implementation/adminUser.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { signinSchema } from '../schemas/signin.schema';
import { UserRole } from '../constants/enums.constant';
import { TrainerApplicationRepository } from '../repositories/implementation/trainerApplication.repository';
import { AdminTrainerApplicationService } from '../services/implementation/adminTrainerApplication.service'; 
import { AdminTrainerApplicationController } from '../controllers/implementation/adminTrainerApplication.controller'; 
import { TrainerRepository } from '../repositories/implementation/trainer.repository';
import { TrainerKycRepository } from '../repositories/implementation/trainerKyc.repository';

const adminRouter = express.Router();



const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const tokenRepository = new PasswordResetTokenRepository();
const authService = new AuthService(userRepository, otpRepository, tokenRepository);
const adminService = new AdminService(authService, userRepository);
const adminController = new AdminController(adminService);

const adminUserService = new AdminUserService(userRepository);
const adminUserController = new AdminUserController(adminUserService);

const trainerApplicationRepository = new TrainerApplicationRepository();
const trainerRepository = new TrainerRepository();
const trainerKycRepository = new TrainerKycRepository();

const adminTrainerApplicationService = new AdminTrainerApplicationService(
  trainerApplicationRepository,
  trainerRepository,
  userRepository,
  trainerKycRepository,
);
const adminTrainerApplicationController = new AdminTrainerApplicationController(adminTrainerApplicationService);

adminRouter.post(
  '/signin', 
  validate(signinSchema), 
  adminController.signin.bind(adminController)
);
adminRouter.get(
  '/users', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminUserController.getAllUsers.bind(adminUserController)
);
adminRouter.patch(
  '/users/:userId/block', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminUserController.blockUser.bind(adminUserController)
);
adminRouter.patch(
  '/users/:userId/unblock', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminUserController.unblockUser.bind(adminUserController)
);

adminRouter.get(
  '/trainer/applications', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminTrainerApplicationController.getApplications.bind(adminTrainerApplicationController)
);

adminRouter.get(
  '/trainer/application/:id/details', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminTrainerApplicationController.getVerificationDetails.bind(adminTrainerApplicationController)
);

adminRouter.patch(
  '/trainer/application/:id/approve', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminTrainerApplicationController.approveApplication.bind(adminTrainerApplicationController)
);

adminRouter.patch(
  '/trainer/application/:id/reject', 
  authenticate, 
  authorizeRoles(UserRole.ADMIN), 
  adminTrainerApplicationController.rejectApplication.bind(adminTrainerApplicationController)
);


export default adminRouter;