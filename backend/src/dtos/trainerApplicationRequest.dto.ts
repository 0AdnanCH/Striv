import { z } from 'zod';
import { trainerPersonalInfoSchema } from "../schemas/trainerPersonalInfo.schema";
import { trainerProfessionalInfoSchema } from '../schemas/trainerProfessionalInfo.schema';
import { trainerWorkInfoSchema } from '../schemas/trainerWorkInfo.schema';
import { trainerKycSchema } from '../schemas/trainerIdentityInfo.schema';

export type TrainerPersonalInfoRequestDto = z.infer<typeof trainerPersonalInfoSchema>;

export type TrainerProfessionalInfoRequestDto = z.infer<typeof trainerProfessionalInfoSchema>;

export type TrainerWorkInfoRequestDto = z.infer<typeof trainerWorkInfoSchema>;

export type TrainerIdentityInfoRequestDto = z.infer<typeof trainerKycSchema>;