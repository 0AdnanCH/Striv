import { Schema, Model, model, Document } from "mongoose";
import { IUser } from "../types/user.type";

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema<UserDocument>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['client', 'trainer', 'admin'], required: true }
}, { timestamps: true });

export const User = model<UserDocument>('User', userSchema);