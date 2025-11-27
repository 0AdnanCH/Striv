import { GENDER } from "../types/user.type"; 

export interface TrainerPersonalInfoResponseDto {
  message: string;
  data: {
    first_name?: string;
    last_name?: string;
    gender?: GENDER;
    age?: number;
    phone?: string;
    profile_photo?: string;
    registrationStep: number;
  };
}

export interface TrainerProfessionalInfoResponseDto {
  message: string;
  data: {
    specialization: string[];
    yearsOfExperience: number;
    additionalSkills?: string[];
    certificates?: {
      title: string;
      issuer: string;
      issuedDate?: Date | null;
      fileUrl?: string;
    }[];
    portfolio: {
      bio: string;
      achievements?: string[];
      socialLinks?: {
        website?: string | null;
        instagram?: string | null;
        youtube?: string | null;
        linkedin?: string | null;
      };
    };
    registrationStep: number;
  };
}

export interface TrainerWorkInfoResponseDto {
  message: string;
  data: {
    pricing: {
      oneToOne: number;
      groupSession: number;
    };
    availability: {
      day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday";
      startTime: string;
      endTime: string;
    }[];
    registrationStep: number;
  };
}

export interface TrainerIdentityInfoResponseDto {
  message: string;
  data: {
    documentType: 'aadhaar' | 'driving_license' | 'pan_card';
    frontImage: string;
    backImage: string | null | undefined;
  };
}

export interface TrainerFullInfoResponseDto {
  message: string;
  data: {
    trainer: {
      first_name?: string;
      last_name?: string;
      gender?: 'male' | 'female';
      age?: number;
      phone?: string;
      profile_photo?: string;
      specialization: string[];
      additionalSkills?: string[];
      yearsOfExperience: number;

      certificates: {
        title: string;
        issuer: string;
        issuedDate?: Date | null;
        fileUrl?: string;
      }[];

      availability: {
        day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
        startTime: string;
        endTime: string;
      }[];

      pricing: {
        oneToOne: number;
        groupSession: number;
      };

      portfolio: {
        bio: string;
        achievements?: string[];
        socialLinks?: {
          website?: string | null;
          instagram?: string | null;
          youtube?: string | null;
          linkedin?: string | null;
        };
      };

      registrationStep: number;
    } | null;

    kyc: {
      documentType?: 'aadhaar' | 'driving_license' | 'pan_card';
      frontImage?: string;
      backImage?: string;
    } | null;
  };
}