import { OTPModel, OtpDocument } from "../../models/otp.model";
import { BaseRepository } from "../base.repository";
import { IOtpRepository } from "../interface/IOtp.repository";

export class OtpRepository extends BaseRepository<OtpDocument> implements IOtpRepository {
  constructor() {
    super(OTPModel);
  }

  async findByEmail(email: string): Promise<OtpDocument | null> {
    return await this.model.findOne({ email }).lean();
  }

  async deleteByEmail(email: string): Promise<void> {
    await this.model.deleteOne({ email });
  }

  async deleteExpired(): Promise<void> {
    await this.model.deleteMany({ expiresAt: { $lt: new Date() } });
  }
}