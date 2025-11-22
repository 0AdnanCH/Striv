export interface TrainerRegistrationStep1Dto {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  age: number;
  phone: string;
  profile_photo: Express.Multer.File; 
}