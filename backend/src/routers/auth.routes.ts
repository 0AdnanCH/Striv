import express from 'express';
import { AuthController } from '../controllers/implementation/auth.controller';
import { AuthService } from '../services/implementation/auth.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { PasswordResetTokenRepository } from '../repositories/implementation/passwordResetToken.repository';
import validate from '../middlewares/validation.middleware';
import { OtpRepository } from '../repositories/implementation/otp.repository';
import { authenticate } from '../middlewares/auth.middleware';
import { signupSchema } from '../schemas/signup.schema';
import { verifyOtpSchema } from '../schemas/verifyOtp.schema';
import { emailSchema } from '../schemas/email.schema';
import { resetPasswordSchema } from '../schemas/resetPassword.schema';
import { changePasswordSchema } from '../schemas/changePassword.schema';
import { signinSchema } from '../schemas/signin.schema';

const authRouter = express.Router();

const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const tokenRepository = new PasswordResetTokenRepository();
const authService = new AuthService(userRepository, otpRepository, tokenRepository);
const authController = new AuthController(authService);

authRouter.post(
  '/signup', 
  validate(signupSchema), 
  authController.signup.bind(authController)
);
authRouter.post(
  '/signin', 
  validate(signinSchema), 
  authController.signin.bind(authController)
);
authRouter.post(
  '/verify-signup-otp', 
  validate(verifyOtpSchema), 
  authController.verifySignUpOtp.bind(authController)
);
authRouter.post(
  '/resend-otp', 
  validate(emailSchema), 
  authController.resendOtp.bind(authController)
);
authRouter.post(
  '/forgot-password', 
  validate(emailSchema), 
  authController.forgotPassword.bind(authController)
);
authRouter.post(
  '/reset-password', 
  validate(resetPasswordSchema), 
  authController.resetPassword.bind(authController)
);
authRouter.post(
  '/google-signin', 
  authController.signInWithGoogle.bind(authController)
);
authRouter.patch(
  '/change-password', 
  authenticate, 
  validate(changePasswordSchema), 
  authController.changePassword.bind(authController)
);

export default authRouter;