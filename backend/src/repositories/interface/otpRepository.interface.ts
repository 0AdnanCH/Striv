import { IOTP, OtpDocument } from "../../models/otp.model";
import { IBaseRepository } from "./baseRepository.interface";

export interface IOtpRepository extends IBaseRepository<OtpDocument> {
  findByEmail(email: string): Promise<OtpDocument | null>;
  deleteByEmail(email: string): Promise<void>;
  deleteExpired(): Promise<void>;
}