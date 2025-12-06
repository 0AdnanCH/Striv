import { trainerApplicationAPI } from '../api/trainerApplication.api';
import type { PersonalInfoPayload, ProfessionalInfoPayload, WorkInfoPayload, IdentityInfoPayload, IPersonalInfoResponse, IProfessionalInfoResponse, IWorkInfoResponse, ITrainerIdentityResponse, ITrainerFullInfoResponse } from '../types/trainerApplication.types';

export const trainerApplicationService = {
  async submitPersonalInfo(payload: PersonalInfoPayload): Promise<IPersonalInfoResponse> {
    const formData = new FormData();

    formData.append('first_name', payload.first_name);
    formData.append('last_name', payload.last_name);
    formData.append('gender', payload.gender);
    formData.append('age', String(payload.age));
    formData.append('phone', payload.phone);
    if (payload.profile_photo instanceof File) {
      formData.append('profile_photo', payload.profile_photo, payload.profile_photo.name);
    }

    const res = await trainerApplicationAPI.submitPersonalInfo(formData);
    return { message: res.message, personalInfo: res.data };
  },

  async submitProfessionalInfo(payload: ProfessionalInfoPayload): Promise<IProfessionalInfoResponse> {
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
          const file = cert.certificateImage instanceof FileList ? cert.certificateImage[0] : cert.certificateImage;

          if (file) {
            console.log('Certificate file:', file);
            formData.append(`certificates`, file, file.name);
          }
        }
      });
    }

    const res = await trainerApplicationAPI.submitProfessionalInfo(formData);
    return { message: res.message, professionalInfo: res.data };
  },

  async submitWorkInfo(payload: WorkInfoPayload): Promise<IWorkInfoResponse> {
    const res = await trainerApplicationAPI.submitWorkInfo(payload);
    return { message: res.message, workInfo: res.data };
  },

  async submitIdentityInfo(payload: IdentityInfoPayload): Promise<ITrainerIdentityResponse> {
    const formData = new FormData();

    formData.append('documentType', payload.documentType);

    const front = payload.frontImage;
    const back = payload.backImage;

    if (front) {
      formData.append('frontImage', front, front.name);
    }

    if (back) {
      formData.append('backImage', back, back.name);
    }

    const res = await trainerApplicationAPI.submitIdentityInfo(formData);
    return { message: res.message, identityInfo: res.data };
  },

  async fetchTrainerFullInfo(): Promise<ITrainerFullInfoResponse> {
    const res = await trainerApplicationAPI.fetchTrainerFullInfo();
    return { message: res.message, trainerInfo: res.data };
  }
};
