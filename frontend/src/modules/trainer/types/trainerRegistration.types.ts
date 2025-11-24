export interface TrainerPersonalInfoPayload {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  age: number;
  phone: string;
  profile_photo: File;
}

export interface TrainerProfessionalInfoPayload {
  specialization: string[];
  yearsOfExperience: number;

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

  additionalSkills?: string[];

  certificates?: {
    title: string;
    issuer: string;
    certificateImage: File;
    issuedDate?: string | null;
  }[];
}

export interface TrainerWorkInfoPayload {
  oneToOnePrice: number;
  groupSessionPrice: number;
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
}

export interface TrainerIdentityInfoPayload {
  documentType: 'aadhaar' | 'driving_license' | 'pan_card';
  frontImage: File;
  backImage?: File;
}

export interface ApiMessageResponse {
  message: string;
}