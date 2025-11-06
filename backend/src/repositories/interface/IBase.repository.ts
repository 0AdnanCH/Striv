import { Document, FilterQuery, Types, UpdateQuery } from "mongoose";

export interface IBaseRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: Types.ObjectId): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  update(id: Types.ObjectId, update: UpdateQuery<T>): Promise<T | null>;
  delete(id: Types.ObjectId): Promise<void>;
}