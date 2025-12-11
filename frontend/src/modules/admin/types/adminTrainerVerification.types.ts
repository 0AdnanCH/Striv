import type { 
  IPersonalInfo, IProfessionalInfo, IWorkInfo, ITrainerIdentityInfo 
} from '../../trainer/types/trainerApplication.types'  // Assuming types are in a file

// --- ENUMS & TYPES ---
export type VerificationStatus = 'PENDING' | 'VALID' | 'INVALID';

export interface VerificationState {
  personal: VerificationStatus;
  professional: VerificationStatus;
  work: VerificationStatus;
  identity: VerificationStatus;
}

export interface RejectionFeedback {
  personal: string;
  professional: string;
  work: string;
  identity: string;
}

// --- DUMMY DATA ---
export const MOCK_TRAINER_DATA = {
  id: "TR-2025-883",
  submittedAt: "2025-12-10T09:30:00Z",
  personal: {
    first_name: "Alex",
    last_name: "Carter",
    gender: "male",
    age: 29,
    phone: "+91 98765 43210",
    profile_photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  } as IPersonalInfo,
  professional: {
    specialization: ["Strength Training", "HIIT", "Rehabilitation"],
    yearsOfExperience: 6,
    additionalSkills: ["Nutrition Planning", "CPR Certified"],
    certificates: [
      {
        title: "ACE Certified Personal Trainer",
        issuer: "American Council on Exercise",
        issuedDate: new Date("2021-05-15"),
        fileUrl: "https://pdfobject.com/pdf/sample.pdf", // Mock URL
      },
    ],
    portfolio: {
      bio: "Dedicated fitness coach with over 6 years of experience transforming lives through structured training and nutritional guidance.",
      achievements: ["Best Trainer 2023 - Gold's Gym", "Trained 50+ Clients"],
      socialLinks: {
        instagram: "https://instagram.com/alexfit",
        linkedin: "https://linkedin.com/in/alexcarter",
      },
    },
  } as IProfessionalInfo,
  work: {
    pricing: { oneToOne: 1500, groupSession: 500 },
    availability: [
      { day: "monday", startTime: "06:00", endTime: "10:00" },
      { day: "monday", startTime: "17:00", endTime: "21:00" },
      { day: "wednesday", startTime: "06:00", endTime: "10:00" },
    ],
  } as IWorkInfo,
  identity: {
    documentType: "aadhaar",
    frontImage: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=1000", // Generic ID card mock
    backImage: null,
  } as ITrainerIdentityInfo,
};