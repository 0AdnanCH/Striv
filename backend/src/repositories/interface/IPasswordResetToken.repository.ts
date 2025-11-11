import { ObjectId } from "mongoose";
import { PasswordResetTokenDocument } from "../../models/passwordResetToken.model";
import { IBaseRepository } from "./IBase.repository";

export interface IPasswordResetTokenRepository extends IBaseRepository<PasswordResetTokenDocument> {
  findValidByHash(tokenHash: string): Promise<PasswordResetTokenDocument | null>;
  invalidateAllForUser(userId: string | ObjectId, session?: any): Promise<void>;
  markUsed(id: string | ObjectId, session?: any): Promise<void>;
  countRecentRequests(userId: string | ObjectId, since: Date): Promise<number>;
}