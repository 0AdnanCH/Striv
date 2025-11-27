import { IAuthService } from "../interface/IAuth.service";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";
import BadRequestError from "../../errors/badRequest.error";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { hashPassword, comparePassword } from "../../utils/password.util";
import { generateOtp } from "../../utils/otp.util";
import { IOtpRepository } from "../../repositories/interface/IOtp.repository";
import { sendEmail } from "../../utils/mailer.util";
import { UserRole } from "../../constants/roles.constants";
import { generateToken } from "../../utils/jwt.util";
import mongoose, { ObjectId } from "mongoose";
import { IPasswordResetTokenRepository } from "../../repositories/interface/IPasswordResetToken.repository";
import { env } from "../../configs/env.config";
import { CryptoUtil } from "../../utils/crypto.util";
import { verifyGoogleAccessToken } from "../../utils/google.util";
import { ChangePasswordDto } from "../../dtos/changePassword.dto";
import { ForgotPasswordDto } from "../../dtos/forgotPassword.dto";
import { ResetPasswordDto } from "../../dtos/resetPassword.dto";
import { SignupDto } from "../../dtos/signup.dto";
import { ResendOtpDto, VerifyOtpDto } from "../../dtos/verifyOtp.dto";
import { SigninDto } from "../../dtos/signin.dto";

export class AuthService implements IAuthService {
  constructor(
    private readonly _userRepository: IUserRepository, 
    private readonly _otpRepository: IOtpRepository,
    private readonly _resetTokenRepository: IPasswordResetTokenRepository,
  ) {}

  async signup(user: SignupDto): Promise<string> {
    const existingUser = await this._userRepository.findByEmail(user.email);

    if (existingUser && existingUser.isVerified) throw new BadRequestError({ statusCode: HTTP_STATUS.BAD_REQUEST, message: RESPONSE_MESSAGES.USER_ALREADY_EXISTS, logging: false });

    const hashedPassword = await hashPassword(user.password);

    const role = UserRole.CLIENT;

    if (existingUser && !existingUser.isVerified) {
      await this._userRepository.updateByEmail(user.email, {
        ...user,
        role,
        password: hashedPassword
      });
    } else {
      await this._userRepository.create({
        ...user,
        role,
        password: hashedPassword,
        isVerified: false
      });
    }

    const otp = generateOtp();
    console.log('Otp Generated:', otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this._otpRepository.deleteByEmail(user.email);
    await this._otpRepository.create({ email: user.email, otp, expiresAt });

    await sendEmail(user.email, 'Striv Email Verification', `Your OTP for Striv signup is ${otp}. It expires in 5 minutes.`);

    return RESPONSE_MESSAGES.OTP_SENT;
  }

  async verifySignUpOtp({ email, otp }: VerifyOtpDto): Promise<{ message: string; token: string; user: { id: ObjectId; role: UserRole; email: string; first_name: string; last_name: string } }> {
    const otpRecord = await this._otpRepository.findByEmail(email);
    if (!otpRecord) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.OTP_NOT_FOUND,
        logging: false
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await this._otpRepository.deleteByEmail(email);
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.OTP_EXPIRED,
        logging: false
      });
    }

    if (otpRecord.otp !== otp) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.INVALID_OTP,
        logging: false
      });
    }

    await this._userRepository.updateByEmail(email, { isVerified: true });

    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    await this._otpRepository.deleteByEmail(email);

    const token = generateToken({id: user._id.toString(), role: user.role});

    return {
      message: RESPONSE_MESSAGES.OTP_VERIFIED,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
      }
    };
  }

  async signin({ email, password }: SigninDto): Promise<{ message: string; token: string; user: { id: ObjectId; email: string; role: UserRole; first_name: string; last_name: string } }> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError({ statusCode: HTTP_STATUS.UNAUTHORIZED, message: RESPONSE_MESSAGES.USER_NOT_FOUND, logging: false });
    }

    if (!user.isVerified) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.EMAIL_NOT_VERIFIED,
        logging: false
      });
    }

    if (user.isBlocked) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.USER_BLOCKED,
        logging: false
      });
    }

    if (!user.password) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.ACCOUNT_REGISTERED_WITH_OAUTH,
        logging: false
      });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      throw new BadRequestError({ statusCode: HTTP_STATUS.UNAUTHORIZED, message: RESPONSE_MESSAGES.INCORRECT_PASSWORD, logging: false });
    }
    const token = generateToken({ id: user._id.toString(), role: user.role });

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
    }
    return { token, user: userData, message: RESPONSE_MESSAGES.LOGIN_SUCCESS };
  }

  async resendOtp({ email }: ResendOtpDto): Promise<string> {
    const user = await this._userRepository.findByEmail(email);
    if(!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false,
      });
    }

    if(user.isVerified) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USER_ALREADY_VERIFIED,
        logging: false,
      });
    }

    const otp = generateOtp();
    console.log('ResendOtp Generated:', otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this._otpRepository.deleteByEmail(email);
    await this._otpRepository.create({ email, otp, expiresAt });

    await sendEmail(
      email,
      'Striv OTP Resend',
      `Your new OTP for Striv signup is ${otp}. It expires in 5 minutes.`
    );

    return RESPONSE_MESSAGES.OTP_RESENT;
  }

  async signInWithGoogle(accessToken: string): Promise<{ message: string; token: string; user: { id: string; email: string; role: string; first_name: string; last_name: string; picture?: string; }; }> {
    const googleUser = await verifyGoogleAccessToken(accessToken);
    let user = await this._userRepository.findByEmail(googleUser.email);

    if(!user) {
      user = await this._userRepository.create({
        email: googleUser.email,
        first_name: googleUser.given_name,
        last_name: googleUser.family_name,
        isVerified: true,
        role: UserRole.CLIENT,
        authProvider: 'google',
        googleId: googleUser.sub,
      });
    }

    const appToken = generateToken({ id: user._id.toString(), role: user.role });

    return {
      message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
      token: appToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        first_name: user.first_name as string,
        last_name: user.last_name as string,
      }
    };
  }

  async requestPasswordReset(data: ForgotPasswordDto, meta?: { ip?: string; ua?: string; }): Promise<{ message: string; }> {
    const user = await this._userRepository.findByEmail(data.email);
    if (!user) {
      return { message: RESPONSE_MESSAGES.PASSWORD_RESET_EMAIL_SENT };
    }
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const attempts = await this._resetTokenRepository.countRecentRequests(user._id, oneHourAgo);
    if (attempts >= 3) {
      return { message: RESPONSE_MESSAGES.PASSWORD_RESET_ALREADY_SENT };
    }

    const rawToken = CryptoUtil.randomToken();
    const tokenHash = CryptoUtil.sha256(rawToken);

    const expiresAt = new Date(Date.now() + env.RESET_TOKEN_TTL_MINUTES * 60 * 1000);

    await this._resetTokenRepository.create({
      userId: user._id,
      tokenHash,
      expiresAt,
      createdIp: meta?.ip,
      createdUserAgent: meta?.ua
    });

    const resetUrl = `${env.APP_URL}/reset-password?token=${rawToken}`;

    await sendEmail(
      user.email,
      "Reset your Striv password",
      `Click the following link to reset your password: ${resetUrl}`
    );

    return { message: RESPONSE_MESSAGES.PASSWORD_RESET_EMAIL_SENT };
  }

  async resetPassword(data: ResetPasswordDto): Promise<{ message: string; }> {
    const tokenHash = CryptoUtil.sha256(data.token);
    const tokenRecord = await this._resetTokenRepository.findValidByHash(tokenHash);
    if (!tokenRecord) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        logging: false
      });
    }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
      const hashedPassword = await hashPassword(data.password);

      await this._userRepository.updatePassword(tokenRecord.userId, hashedPassword, session);
      
      await this._resetTokenRepository.invalidateAllForUser(tokenRecord.userId, session);

      await this._resetTokenRepository.markUsed(tokenRecord._id, session);
      });
    } finally {
      await session.endSession();
    }

    return { message: RESPONSE_MESSAGES.PASSWORD_RESET_SUCCESS };
  }

  async changePassword(userId: string, data: ChangePasswordDto): Promise<{ message: string; }> {
    const { currentPassword, newPassword } = data;
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    if (!user.password) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.PASSWORD_CHANGE_NOT_ALLOWED_FOR_GOOGLE,
        logging: false
      });
    }

    const isValidCurrentPassword = await comparePassword(currentPassword, user.password);
    if (!isValidCurrentPassword) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.INCORRECT_PASSWORD,
        logging: false
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await this._userRepository.updatePassword(user._id, hashedPassword);

    return { message: RESPONSE_MESSAGES.PASSWORD_UPDATE_SUCCESS };
  }
}