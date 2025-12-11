export interface TrainerApplication {
  id: string;
  fullName: string;
  email: string;
  specialization: string;
  experienceYears: number;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// Mock Data for demonstration
export const MOCK_TRAINERS: TrainerApplication[] = [
  { id: '1', fullName: 'John Doe', email: 'john@fit.com', specialization: 'Strength Training', experienceYears: 5, appliedDate: '2025-12-01', status: 'PENDING' },
  { id: '2', fullName: 'Sarah Smith', email: 'sarah@yoga.com', specialization: 'Yoga & Pilates', experienceYears: 8, appliedDate: '2025-12-03', status: 'APPROVED' },
  { id: '3', fullName: 'Mike Tyson', email: 'mike@box.com', specialization: 'Boxing', experienceYears: 20, appliedDate: '2025-12-05', status: 'REJECTED' },
  { id: '4', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '5', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '6', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '7', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '8', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '9', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '10', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '11', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '12', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' },
  { id: '13', fullName: 'Emily Davis', email: 'emily@cardio.com', specialization: 'HIIT', experienceYears: 3, appliedDate: '2025-12-08', status: 'PENDING' }
];