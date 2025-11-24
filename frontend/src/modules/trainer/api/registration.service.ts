import { trainerRegistrationAPI } from './registration.api';
import type { TrainerPersonalInfoPayload, ApiMessageResponse, TrainerProfessionalInfoPayload, TrainerWorkInfoPayload, TrainerIdentityInfoPayload } from '../types/trainerRegistration.types';

export const trainerRegistrationService = {
  async submitPersonalInfo(payload: TrainerPersonalInfoPayload): Promise<ApiMessageResponse> {
    const formData = new FormData();

    formData.append('first_name', payload.first_name);
    formData.append('last_name', payload.last_name);
    formData.append('gender', payload.gender);
    formData.append('age', String(payload.age));
    formData.append('phone', payload.phone);
    formData.append('profile_photo', payload.profile_photo);

    const res = await trainerRegistrationAPI.submitPersonalInfo(formData);
    return res;
  },

  async submitProfessionalInfo(payload: TrainerProfessionalInfoPayload): Promise<ApiMessageResponse> {
    const formData = new FormData();

    payload.specialization.forEach((s) => {
      formData.append('specialization[]', s);
    });

    formData.append('yearsOfExperience', String(payload.yearsOfExperience));

    formData.append('portfolio[bio]', payload.portfolio.bio);

    if (payload.portfolio.achievements?.length) {
      payload.portfolio.achievements.forEach((ach) => {
        formData.append('portfolio[achievements][]', ach);
      });
    }

    if (payload.portfolio.socialLinks) {
      const links = payload.portfolio.socialLinks;
      Object.entries(links).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(`portfolio[socialLinks][${key}]`, value);
        }
      });
    }

    if (payload.additionalSkills?.length) {
      payload.additionalSkills.forEach((skill) => {
        formData.append('additionalSkills[]', skill);
      });
    }

    if (payload.certificates?.length) {
      payload.certificates.forEach((cert, index) => {
        formData.append(`certificates[${index}][title]`, cert.title);
        formData.append(`certificates[${index}][issuer]`, cert.issuer);

        if (cert.issuedDate) {
          formData.append(`certificates[${index}][issuedDate]`, cert.issuedDate);
        }

        if (cert.certificateImage) {
          formData.append(`certificates[${index}][certificateImage]`, cert.certificateImage, cert.certificateImage.name);
        }
      });
    }

    const result = await trainerRegistrationAPI.submitProfessionalInfo(formData);
    return result;
  },

  async submitWorkInfo(payload: TrainerWorkInfoPayload): Promise<ApiMessageResponse> {
    return await trainerRegistrationAPI.submitWorkInfo(payload);
  },

  async submitIdentityInfo(payload: TrainerIdentityInfoPayload): Promise<ApiMessageResponse> {
    const formData = new FormData();

    formData.append('documentType', payload.documentType);

    if (payload.frontImage) {
      formData.append('frontImage', payload.frontImage, payload.frontImage.name);
    }

    if (payload.backImage) {
      formData.append('backImage', payload.backImage, payload.backImage.name);
    }

    return await trainerRegistrationAPI.submitIdentityInfo(formData);
  }
};
