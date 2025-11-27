import express from 'express';
import { UserController } from '../controllers/implementation/user.controller'; 
import { UserService } from '../services/implementation/user.service'; 
import { UserRepository } from '../repositories/implementation/user.repository'; 
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware'; 
import { updateUserProfileSchema } from '../schemas/updateUserProfile.schema'; 
import validate from '../middlewares/validation.middleware';

const userRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get(
  '/me', 
  authenticate, 
  authorizeRoles('client', 'trainer'), 
  userController.getMyProfile.bind(userController));
userRouter.patch(
  '/me',
  authenticate,
  authorizeRoles('client', 'trainer'),
  validate(updateUserProfileSchema),
  userController.updateMyProfile.bind(userController)
);

export default userRouter;