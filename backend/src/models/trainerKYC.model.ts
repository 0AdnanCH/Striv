import { Document, model, ObjectId, Schema } from "mongoose";
import { ITrainerKyc } from "../types/trainer.type";
import { DocumentType, Status } from "../constants/enums.constant";

export interface TrainerKycDocument extends ITrainerKyc, Document<ObjectId> {
  _id: ObjectId;
}

const trainerKycSchema = new Schema<TrainerKycDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    documentType: {
      type: String,
      enum: DocumentType,
      required: true
    },

    frontImageUrl: { type: String, required: true },
    backImageUrl: { type: String, required: false },

    status: {
      type: String,
      enum: Status,
      default: Status.PENDING
    },

    rejectionReason: { type: String, required: false },

    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    reviewedAt: { type: Date, required: false }
  },
  { timestamps: true }
);

export const TrainerKyc = model<TrainerKycDocument>('TrainerKYC', trainerKycSchema);