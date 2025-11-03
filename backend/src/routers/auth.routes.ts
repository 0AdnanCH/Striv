import express from 'express';
import { AuthController } from '../controllers/implementation/auth.controller';
import { AuthService } from '../services/implementation/auth.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { emailSchema, otpSchema, signupSchema } from '../schemas/auth.schema';
import validate from '../middlewares/validation.middleware';
import { OtpRepository } from '../repositories/implementation/otp.repository';

const authRouter = express.Router();

const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const authService = new AuthService(userRepository, otpRepository);
const authController = new AuthController(authService);

authRouter.post('/signup', validate(signupSchema), authController.signup.bind(authController));
authRouter.post('/signin', authController.signin.bind(authController));
authRouter.post('/verify-signup-otp', validate(otpSchema), authController.verifySignUpOtp.bind(authController));
authRouter.post('/resend-otp', validate(emailSchema), authController.resendOtp.bind(authController));

export default authRouter;