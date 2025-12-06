import { Document, FilterQuery, Model, ObjectId, QueryOptions, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./interface/IBase.repository";

export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async findById(id: ObjectId | string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter);
  }

  async findByIdAndUpdate(id: string | ObjectId, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, update, options);
  }

  async findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, update, options);
  }

  async delete(id: ObjectId): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}