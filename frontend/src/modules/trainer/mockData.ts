import { Gender } from "../../constants/gender.constant";
import { DocumentType } from "./constants/trainerDocType.constant";
import { WeekDay } from "./constants/weekDay.constant";
import type { ITrainerFullInfo } from "./types/trainerApplication.types";

// Mock Data for Testing
export const mockTrainerData: ITrainerFullInfo = {
  applicationStep: 4, // Completed all steps
  applicationStatus: 'REVISION_REQUIRED', // Set to 'PENDING_APPROVAL' or 'APPROVED' to test other states

  personalInfo: {
    first_name: 'Alex',
    last_name: 'Fitowski',
    gender: Gender.MALE, // Assuming Gender is a string or enum
    age: 28,
    phone: '+1 (555) 012-3456',
    profile_photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },

  professionalInfo: {
    specialization: ['HIIT', 'Strength Training', 'Calisthenics'],
    yearsOfExperience: 5,
    additionalSkills: ['Nutrition Planning', 'Rehabilitation', 'Sports Psychology'],
    certificates: [
      {
        title: 'Certified Personal Trainer (CPT)',
        issuer: 'NASM',
        issuedDate: new Date('2020-05-15'),
        fileUrl: 'https://example.com/certificates/nasm-cpt.pdf'
      },
      {
        title: 'Advanced Nutrition Coach',
        issuer: 'Precision Nutrition',
        issuedDate: new Date('2021-08-20'),
        fileUrl: 'https://example.com/certificates/pn-l1.pdf'
      }
    ],
    portfolio: {
      bio: 'I am a dedicated fitness professional with over 5 years of experience transforming lives through movement. My approach combines science-based strength training with holistic nutrition strategies. I believe in sustainable fitness that fits into your lifestyle, not the other way around.',
      achievements: ["Voted 'Trainer of the Year 2023' at City Gym", 'Helped 50+ clients lose over 10kg sustainably', 'Completed the London Marathon 2022'],
      socialLinks: {
        website: 'https://www.alexfitowski.com',
        instagram: 'https://instagram.com/alexfit',
        youtube: 'https://youtube.com/c/alexfitowski',
        linkedin: 'https://linkedin.com/in/alexfitowski'
      }
    }
  },

  workInfo: {
    pricing: {
      oneToOne: 50, // $50 per session
      groupSession: 20 // $20 per person
    },
    availability: [
      {
        day: WeekDay.MONDAY, // Assuming WeekDay is a string or enum
        startTime: '09:00',
        endTime: '17:00'
      },
      {
        day: WeekDay.WEDNESDAY,
        startTime: '09:00',
        endTime: '14:00'
      },
      {
        day: WeekDay.FRIDAY,
        startTime: '10:00',
        endTime: '16:00'
      }
    ]
  },

  identityInfo: {
    documentType: DocumentType.DRIVING_LICENSE, // Assuming DocumentType is a string or enum
    frontImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600',
    backImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600' // Using placeholder
  }
};
