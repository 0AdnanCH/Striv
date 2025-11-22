import { UpdateQuery } from "mongoose";
import { TrainerDocument } from "../../models/trainer.model";
import { IBaseRepository } from "./IBase.repository";

export interface ITrainerRepository extends IBaseRepository<TrainerDocument> {
  findByUserId(userId: string): Promise<TrainerDocument | null>;
  updateByUserId(userId: string, update: UpdateQuery<TrainerDocument>): Promise<TrainerDocument | null>;
}