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

const adminRouter = express.Router();

const userRepository = new UserRepository();
const otpRepository = new OtpRepository
const tokenRepository = new PasswordResetTokenRepository()
const authService = new AuthService(userRepository, otpRepository, tokenRepository);
const adminService = new AdminService(authService, userRepository);
const adminController = new AdminController(adminService);

const adminUserService = new AdminUserService(userRepository);
const adminUserController = new AdminUserController(adminUserService);

adminRouter.post('/signin', validate(signinSchema), adminController.signin.bind(adminController));
adminRouter.get('/users', authenticate, authorizeRoles('admin'), adminUserController.getAllUsers.bind(adminUserController));
adminRouter.patch('/users/:userId/block', authenticate, authorizeRoles('admin'), adminUserController.blockUser.bind(adminUserController));
adminRouter.patch('/users/:userId/unblock', authenticate, authorizeRoles('admin'), adminUserController.unblockUser.bind(adminUserController));

export default adminRouter;