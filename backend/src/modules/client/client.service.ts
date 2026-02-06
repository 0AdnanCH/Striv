import mongoose from 'mongoose';
import { IClientService, IRegistrationResult } from './interfaces/IClientService';
import { RegisterClientInput } from './client.dto';
import { ActivityLevel, IClientProfile } from './interfaces/IClientProfile';
import { AuthProvider, UserRole } from '../../constants/enums.constant';
import { IUser, IUserRepository } from '../user/interfaces';
import { IClientRepository } from './interfaces/IClientRepository';
import { hashPassword } from '../../utils/password.util';

export class ClientService implements IClientService {
  // 1. Private fields with underscore naming convention (SOLID: Encapsulation)
  private readonly _userRepository: IUserRepository;
  private readonly _clientRepository: IClientRepository;

  // 2. Dependency Injection via Constructor (SOLID: Dependency Inversion)
  constructor(userRepository: IUserRepository, clientRepository: IClientRepository) {
    this._userRepository = userRepository;
    this._clientRepository = clientRepository;
  }
  public async registerClient(input: RegisterClientInput): Promise<IRegistrationResult> {
    // 1. Performance Check: Fast fail if email exists
    const emailExists = await this._userRepository.existsByEmail(input.email);
    if (emailExists) {
      throw new Error('Email is already in use'); // 409 Conflict
    }

    // 2. Security: Hash the password
    const hashedPassword = await hashPassword(input.password);

    // 3. Start a Database Transaction (Session)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Step A: Create the User (Identity)
      const userData = {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        role: UserRole.CLIENT,
        authProvider: AuthProvider.LOCAL,
        isVerified: true, // Clients are auto-verified (unlike Trainers)
        isActive: true
      };

      // We use the 'createWithSession' method we built in the UserRepo
      const newUser = await this._userRepository.createWithSession(userData, session);

      // Step B: Create the Client Profile (Domain Data)
      // Note: We initialize with defaults since we aren't asking for health data yet
      const profileData = {
        user: newUser._id,
        dateOfBirth: undefined, // Will be filled in "Step 2" of onboarding
        gender: undefined,
        fitnessGoals: [],
        activityLevel: ActivityLevel.SEDENTARY,
        onboardingStep: 1 // Flag to track they haven't finished setup
      } as unknown as IClientProfile;

      const newProfile = await this._clientRepository.createWithSession(profileData, session);

      // Step C: Commit the Transaction
      // If code reaches here, both User and Profile are safe to save.
      await session.commitTransaction();

      // 4. Sanitize Return Data (Remove Password)
      // .toObject() converts Mongoose document to plain JS object
      const userResponse: IUser = newUser.toObject();
      delete userResponse.password;

      return {
        user: userResponse,
        profile: newProfile
      };
    } catch (error) {
      // CRITICAL: Abort Transaction on Error
      // If Profile creation fails, the User creation is UNDONE automatically.
      await session.abortTransaction();

      // Re-throw the error so the Controller can send it to the frontend
      throw error;
    } finally {
      // Always end the session to free up database resources
      session.endSession();
    }
  }
}