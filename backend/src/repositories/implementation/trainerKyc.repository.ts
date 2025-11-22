import { UpdateQuery } from "mongoose";
import { TrainerKyc, TrainerKycDocument } from "../../models/trainerKyc.model";
import { BaseRepository } from "../base.repository";
import { ITrainerKycRepository } from "../interface/ITrainerKyc.repository";

export class TrainerKycRepository extends BaseRepository<TrainerKycDocument> implements ITrainerKycRepository {
  constructor() {
    super(TrainerKyc);
  }

  async findByUserId(userId: string): Promise<TrainerKycDocument | null> {
    return this.model.findOne({ userId }).exec();
  }

  async updateByUserId(userId: string, update: UpdateQuery<TrainerKycDocument>): Promise<TrainerKycDocument | null> {
    return this.model
      .findOneAndUpdate({ userId }, update, {
        new: true,
        runValidators: true
      })
      .exec();
  }
}