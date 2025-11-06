import { Schema, model, Document, ObjectId } from "mongoose";
import { IUser } from "../types/user.type";
import { UserRole } from "../constants/roles.constants";

export interface UserDocument extends IUser, Document<ObjectId> {
  _id: ObjectId;
}

const userSchema = new Schema<UserDocument>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.CLIENT },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

export const User = model<UserDocument>('User', userSchema);