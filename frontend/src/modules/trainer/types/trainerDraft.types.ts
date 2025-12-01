import type { DeepPartial } from "./common.types";
import type {
  ITrainer,
  ITrainerIdentityInfo
} from "./trainerApplication.types"; 

export type TrainerDraft = DeepPartial<ITrainer>;

export interface ITrainerFullInfoDraft {
  trainer: TrainerDraft | null;
  kyc: DeepPartial<ITrainerIdentityInfo> | null;
}