import { DocumentType, Gender, WeekDay } from "../constants/enums.constant";

export interface ITrainerApplicationDetailsResponse {
  applicationId: string;
  status: string;
  submissionDate: Date | null;
  personal: {
    first_name: string;
    last_name: string;
    email: string;
    gender: Gender;
    age: number;
    phone: string;
    profile_photo: string;
  };
  professional: {
    specialization: string[];
    yearsOfExperience: number;
    additionalSkills?: string[];
    certificates: {
      title: string;
      issuer: string;
      issuedDate: Date | null;
      fileUrl: string;
    }[];
    portfolio: {
      bio: string;
      achievements?: string[];
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
      day: WeekDay;
      startTime: string;
      endTime: string;
    }[];
  };
  identity: {
    documentType: DocumentType;
    frontImage: string;
    backImage: string | null;
    isKycSubmitted: boolean;
  };
}
