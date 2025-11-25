import express from 'express';
import { AuthController } from '../controllers/implementation/auth.controller';
import { AuthService } from '../services/implementation/auth.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { PasswordResetTokenRepository } from '../repositories/implementation/passwordResetToken.repository';
import { emailSchema, otpSchema, signupSchema } from '../schemas/auth.schema';
import validate from '../middlewares/validation.middleware';
import { OtpRepository } from '../repositories/implementation/otp.repository';
import { ForgotPasswordDto, ResetPasswordDto } from '../dtos/auth.dto';
import { authenticate } from '../middlewares/auth.middleware';
import { changePasswordSchema } from '../dtos/changePassword.dto';

const authRouter = express.Router();

const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const tokenRepository = new PasswordResetTokenRepository();
const authService = new AuthService(userRepository, otpRepository, tokenRepository);
const authController = new AuthController(authService);

authRouter.post('/signup', validate(signupSchema), authController.signup.bind(authController));
authRouter.post('/signin', authController.signin.bind(authController));
authRouter.post('/verify-signup-otp', validate(otpSchema), authController.verifySignUpOtp.bind(authController));
authRouter.post('/resend-otp', validate(emailSchema), authController.resendOtp.bind(authController));
authRouter.post('/forgot-password', validate(ForgotPasswordDto), authController.forgotPassword.bind(authController));
authRouter.post('/reset-password', validate(ResetPasswordDto), authController.resetPassword.bind(authController));
authRouter.post('/google-signin', authController.signInWithGoogle.bind(authController));
authRouter.patch('/change-password', authenticate, validate(changePasswordSchema), authController.changePassword.bind(authController));

export default authRouter;