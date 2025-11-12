import { Schema, model, Document, ObjectId } from "mongoose";
import { IUser } from "../types/user.type";
import { UserRole } from "../constants/roles.constants";

export interface UserDocument extends IUser, Document<ObjectId> {
  _id: ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: false },
    gender: { type: String, enum: ['male', 'female'], required: false },
    age: { type: Number, required: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.CLIENT },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);