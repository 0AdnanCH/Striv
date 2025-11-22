import { OtpDocument } from "../../models/otp.model";
import { IBaseRepository } from "./IBase.repository";

export interface IOtpRepository extends IBaseRepository<OtpDocument> {
  findByEmail(email: string): Promise<OtpDocument | null>;
  deleteByEmail(email: string): Promise<void>;
  deleteExpired(): Promise<void>;
}