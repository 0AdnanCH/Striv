import { Document, FilterQuery, Model, ObjectId, QueryOptions, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./base.interface"; 

export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    return await created.save();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async findByIdAndUpdate(id: string, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, update, options).exec();
  }

  async findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, update, options).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}