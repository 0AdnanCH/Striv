import express from 'express';
import { AuthController } from '../controllers/implementation/auth.controller';
import { AuthService } from '../services/implementation/auth.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { signupSchema } from '../utils/authSchemas.util';
import validate from '../middlewares/validation.middleware';

const authRouter = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/signup', validate(signupSchema), authController.signup.bind(authController));
authRouter.post('/signin', authController.signin.bind(authController));

export default authRouter;