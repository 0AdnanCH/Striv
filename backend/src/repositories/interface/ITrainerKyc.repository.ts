import { UpdateQuery } from "mongoose";
import { TrainerKycDocument } from "../../models/trainerKYC.model";
import { IBaseRepository } from "./IBase.repository";

export interface ITrainerKycRepository extends IBaseRepository<TrainerKycDocument> {
    findByUserId(userId: string): Promise<TrainerKycDocument | null>;
    updateByUserId(userId: string, update: UpdateQuery<TrainerKycDocument>): Promise<TrainerKycDocument | null>;
}