import { Document, FilterQuery, ObjectId, QueryOptions, UpdateQuery } from "mongoose";

export interface IBaseRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: ObjectId | string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findByIdAndUpdate(id: string | ObjectId, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null>;
  findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null>;
  delete(id: ObjectId): Promise<void>;
}