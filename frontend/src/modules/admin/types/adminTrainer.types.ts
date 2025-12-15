import type { GenderType } from "../../../constants/gender.constant";
import type { TrainerApplicationStatusType } from "../../trainer/constants/trainerApplicationStatus.constant";
import type { WeekDayType } from "../../trainer/constants/weekDay.constant";

export interface GetApplicationsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TrainerApplicationStatusType;
  sortBy?: 'submissionDate' | 'firstName' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export interface TrainerApplicationListItem {
  _id: string;
  fullName: string;
  email: string;
  profilePhoto: string;
  status: TrainerApplicationStatusType;
  submittedAt: string; // ISO Date string
  currentStep: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    data: TrainerApplicationListItem[];
    meta: PaginationMeta;
  };
}

export interface GetApplicationDetailsResponse {
  success: boolean;
  message: string;
  data: {
    applicationId: string;
    status: string;
    submissionDate: string | null;
    personal: {
      first_name: string;
      last_name: string;
      email: string;
      gender: GenderType;
      age: number;
      phone: string;
      profile_photo: string;
    };
    professional: {
      specialization: string[];
      yearsOfExperience: number;
      additionalSkills: string[];
      certificates: {
        title: string;
        issuer: string;
        issuedDate?: Date | null;
        fileUrl?: string;
      }[];
      portfolio: {
        bio: string;
        achievements: string[];
        socialLinks: {
          website?: string | null;
          instagram?: string | null;
          linkedin?: string | null;
          youtube?: string | null;
        };
      };
    };
    work: {
      pricing: {
        oneToOne: number;
        groupSession: number;
      };
      availability: {
        day: WeekDayType;
        startTime: string;
        endTime: string;
      }[];
    };
    identity: {
      isKycSubmitted: boolean;
      documentType: string;
      frontImage: string;
      backImage: string | null;
    };
  };
}