import { IUser } from "../../types/user.type";
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
import { ObjectId } from "mongoose";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository, private otpRepository: IOtpRepository) {}

  async signup(user: IUser): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser && existingUser.isVerified) throw new BadRequestError({ statusCode: HTTP_STATUS.BAD_REQUEST, message: RESPONSE_MESSAGES.USER_ALREADY_EXISTS, logging: false });

    const hashedPassword = await hashPassword(user.password);

    const role = UserRole.CLIENT;

    if (existingUser && !existingUser.isVerified) {
      await this.userRepository.updateByEmail(user.email, {
        ...user,
        role,
        password: hashedPassword
      });
    } else {
      await this.userRepository.create({
        ...user,
        role,
        password: hashedPassword,
        isVerified: false
      });
    }

    const otp = generateOtp();
    console.log('Otp Generated:', otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpRepository.deleteByEmail(user.email);
    await this.otpRepository.create({ email: user.email, otp, expiresAt });

    await sendEmail(user.email, 'Striv Email Verification', `Your OTP for Striv signup is ${otp}. It expires in 5 minutes.`);

    return RESPONSE_MESSAGES.OTP_SENT;
  }

  async verifySignUpOtp(email: string, otp: string): Promise<{ message: string; token: string; user: { id: ObjectId; role: UserRole; email: string; first_name: string; last_name: string } }> {
    const otpRecord = await this.otpRepository.findByEmail(email);
    if (!otpRecord) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.OTP_NOT_FOUND,
        logging: false
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await this.otpRepository.deleteByEmail(email);
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

    await this.userRepository.updateByEmail(email, { isVerified: true });

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    await this.otpRepository.deleteByEmail(email);

    const token = generateToken({id: user._id.toString(), role: user.role});

    return {
      message: RESPONSE_MESSAGES.OTP_VERIFIED,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      }
    };
  }

  async signin(email: string, password: string): Promise<{ message: string; token: string; user: { id: ObjectId; email: string; role: UserRole; first_name: string; last_name: string } }> {
    const user = await this.userRepository.findByEmail(email);
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

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      throw new BadRequestError({ statusCode: HTTP_STATUS.UNAUTHORIZED, message: RESPONSE_MESSAGES.INCORRECT_PASSWORD, logging: false });
    }
    const token = generateToken({ id: user._id.toString(), role: user.role });

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    }
    return { token, user: userData, message: RESPONSE_MESSAGES.LOGIN_SUCCESS };
  }

  async resendOtp(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
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

    await this.otpRepository.deleteByEmail(email);
    await this.otpRepository.create({ email, otp, expiresAt });

    await sendEmail(
      email,
      'Striv OTP Resend',
      `Your new OTP for Striv signup is ${otp}. It expires in 5 minutes.`
    );

    return RESPONSE_MESSAGES.OTP_RESENT;
  }
}