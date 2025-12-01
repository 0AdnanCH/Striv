import { Schema, model, Document, ObjectId } from "mongoose";
import { IUser } from "../types/user.type";
import { AuthProvider, Gender, UserRole } from "../constants/enums.constant";

export interface UserDocument extends IUser, Document<ObjectId> {
  _id: ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    gender: { type: String, enum: Gender, required: false },
    age: { type: Number, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    phone: { type: String, required: false },
    profile_photo: { type: String, required: false },
    role: { type: String, enum: UserRole, default: UserRole.CLIENT },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    authProvider: { type: String, enum: AuthProvider, default: AuthProvider.LOCAL },
    googleId: { type: String, unique: true, sparse: true }
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);