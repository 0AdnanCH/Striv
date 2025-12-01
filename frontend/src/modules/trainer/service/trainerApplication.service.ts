import { trainerRegistrationAPI } from '../api/trainerApplication.api';
import type { PersonalInfoPayload, ProfessionalInfoPayload, WorkInfoPayload, IdentityInfoPayload, ITrainerFullInfo, IPersonalInfoResponse, IProfessionalInfoResponse, IWorkInfoResponse, ITrainerIdentityResponse } from '../types/trainerApplication.types';
import { normalizeFile } from '../utils/normalizeFile.util';

export const trainerRegistrationService = {
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

    const res = await trainerRegistrationAPI.submitPersonalInfo(formData);
    return res;
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

    const res = await trainerRegistrationAPI.submitProfessionalInfo(formData);
    return res;
  },

  async submitWorkInfo(payload: WorkInfoPayload): Promise<IWorkInfoResponse> {
    return await trainerRegistrationAPI.submitWorkInfo(payload);
  },

  async submitIdentityInfo(payload: IdentityInfoPayload): Promise<ITrainerIdentityResponse> {
    const formData = new FormData();

    formData.append('documentType', payload.documentType);

    const front = normalizeFile(payload.frontImage);
    const back = normalizeFile(payload.backImage);


    if (front) {
      formData.append('frontImage', front, front.name);
    }

    if (back) {
      formData.append('backImage', back, back.name);
    }

    return await trainerRegistrationAPI.submitIdentityInfo(formData);
  },

  async fetchTrainerFullInfo(): Promise<ITrainerFullInfo> {
    const { data } = await trainerRegistrationAPI.fetchTrainerFullInfo();
    return data;
  }
};
