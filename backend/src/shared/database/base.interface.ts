import { Document, FilterQuery, ObjectId, QueryOptions, UpdateQuery } from 'mongoose';

export interface IBaseRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findByIdAndUpdate(id: string, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null>;
  findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}