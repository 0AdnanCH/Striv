import { BaseRepository } from "../base.repository";
import { PasswordResetToken, PasswordResetTokenDocument } from "../../models/passwordResetToken.model";
import { IPasswordResetTokenRepository } from "../interface/IPasswordResetToken.repository";
import { ObjectId } from "mongoose";

export class PasswordResetTokenRepository
  extends BaseRepository<PasswordResetTokenDocument>
  implements IPasswordResetTokenRepository 
{
  constructor() {
    super(PasswordResetToken);
  }

  async findValidByHash(tokenHash: string) {
    return this.model.findOne({
      tokenHash,
      usedAt: { $exists: false },
      expiresAt: { $gt: new Date() },
    });
  }

  async invalidateAllForUser(userId: string | ObjectId, session?: any) {
    await this.model.updateMany(
      { userId: userId, usedAt: { $exists: false } },
      { $set: { usedAt: new Date() } },
      { session }
    );
  }

  async markUsed(id: string | ObjectId, session?: any) {
    await this.model.updateOne(
      { _id: id },
      { $set: { usedAt: new Date() } },
      { session }
    );
  }

  async countRecentRequests(userId: string | ObjectId, since: Date) {
    return this.model.countDocuments({
      userId: userId,
      createdAt: { $gte: since },
    });
  }
}