import { UpdateQuery } from "mongoose";
import { Trainer, TrainerDocument } from "../../models/trainer.model";
import { BaseRepository } from "../base.repository"
import { ITrainerRepository } from "../interface/ITrainer.repository";

export class TrainerRepository extends BaseRepository<TrainerDocument> implements ITrainerRepository {
  constructor() {
    super(Trainer);
  }

  async findByUserId(userId: string): Promise<TrainerDocument | null> {
    return this.model.findOne({ userId }).exec();
  }

  async updateByUserId(userId: string, update: UpdateQuery<TrainerDocument>): Promise<TrainerDocument | null> {
    return this.model
      .findOneAndUpdate({ userId }, update, {
        new: true,
        runValidators: true
      })
      .exec();
  }
}