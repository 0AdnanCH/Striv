import { Document, model, ObjectId, Schema } from "mongoose";
import { ITrainerKyc, KycDocumentType, KycStatus } from "../types/trainer.type";

export interface TrainerKycDocument extends ITrainerKyc, Document<ObjectId> {
  _id: ObjectId;
}

const trainerKycSchema = new Schema<TrainerKycDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    documentType: {
      type: String,
      enum: Object.values(KycDocumentType),
      required: true
    },

    frontImageUrl: { type: String, required: true },
    backImageUrl: { type: String, required: false },

    status: {
      type: String,
      enum: Object.values(KycStatus),
      default: KycStatus.PENDING
    },

    rejectionReason: { type: String, required: false },

    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    reviewedAt: { type: Date, required: false }
  },
  { timestamps: true }
);

export const TrainerKyc = model<TrainerKycDocument>('TrainerKYC', trainerKycSchema);