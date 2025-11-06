import express from 'express';
import { AdminController } from '../controllers/implementation/admin.controller';
import { AdminService } from '../services/implementation/admin.service';
import { AuthService } from '../services/implementation/auth.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { OtpRepository } from '../repositories/implementation/otp.repository';
import validate from '../middlewares/validation.middleware';
import { adminSigninSchema } from '../schemas/auth.schema';
import { AdminUserService } from '../services/implementation/adminUser.service';
import { AdminUserController } from '../controllers/implementation/adminUser.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';

const adminRouter = express.Router();

const userRepository = new UserRepository();
const otpRepository = new OtpRepository
const authService = new AuthService(userRepository, otpRepository);
const adminService = new AdminService(authService, userRepository);
const adminController = new AdminController(adminService);

const adminUserService = new AdminUserService(userRepository);
const adminUserController = new AdminUserController(adminUserService);

adminRouter.post('/signin', validate(adminSigninSchema), adminController.signin.bind(adminController));
adminRouter.get('/users', authenticate, authorizeRoles('admin'), adminUserController.getAllUsers.bind(adminUserController));
adminRouter.patch('/users/:userId/block', authenticate, authorizeRoles('admin'), adminUserController.blockUser.bind(adminUserController));
adminRouter.patch('/users/:userId/unblock', authenticate, authorizeRoles('admin'), adminUserController.unblockUser.bind(adminUserController));

export default adminRouter;