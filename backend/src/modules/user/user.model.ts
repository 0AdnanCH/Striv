import { Schema, model, Document, ObjectId } from "mongoose";
import { IUser } from "./interfaces"; 
import { AuthProvider, UserRole } from '../../constants/enums.constant';

const userSchema = new Schema<IUser>(
  {
    // --- AUTHENTICATION ---
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true // CRITICAL: Makes login queries instant
    },
    password: {
      type: String,
      required: function (this: IUser) {
        // Password is required ONLY if provider is LOCAL
        return this.authProvider === AuthProvider.LOCAL;
      },
      select: false // SECURITY: Never return password in queries by default
    },

    // --- AUTHORIZATION ---
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENT,
      required: true
    },

    // --- BASIC IDENTITY ---
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profilePhoto: { type: String, default: null },

    // --- SECURITY FLAGS ---
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    // --- OAUTH PROVIDERS ---
    authProvider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // IMPORTANT: Allows multiple users to have 'null' googleId
      select: false // Security: No need to send this to frontend
    }
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ firstName: 1, lastName: 1 });

export const UserModel = model<IUser>('UserModel', userSchema);