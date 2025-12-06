import { createApi } from '@reduxjs/toolkit/query/react';
import { appBaseQuery } from '../../../api/baseQuery';
import type {
  PersonalInfoPayload,
  ProfessionalInfoPayload,
  WorkInfoPayload,
  IdentityInfoPayload,
  ITrainerFullInfoApiResponse,
  ITrainerFullInfo,
  IPersonalInfoApiResponse,
  IProfessionalInfoApiResponse,
  IWorkInfoApiResponse,
  ITrainerIdentityApiResponse,
} from '../types/trainerApplication.types';

const TRAINER_BASE = '/trainer/application';

export const trainerApplicationApi = createApi({
  reducerPath: 'trainerApplicationApi',

  baseQuery: appBaseQuery,

  tagTypes: ['TrainerApplication'],

  endpoints: (builder) => ({
    // FETCH FULL TRAINER INFO
    fetchFullInfo: builder.query<ITrainerFullInfo, void>({
      query: () => ({
        url: `${TRAINER_BASE}/me`,
        method: 'GET'
      }),
      transformResponse: (response: ITrainerFullInfoApiResponse) => {
        return response.data;
      },
      providesTags: ['TrainerApplication']
    }),

    // SUBMIT PERSONAL INFO (multipart)
    submitPersonalInfo: builder.mutation<IPersonalInfoApiResponse, PersonalInfoPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append('first_name', payload.first_name);
        formData.append('last_name', payload.last_name);
        formData.append('gender', payload.gender);
        formData.append('age', String(payload.age));
        formData.append('phone', payload.phone);

        if (payload.profile_photo instanceof File) {
          formData.append('profile_photo', payload.profile_photo, payload.profile_photo.name);
        }

        return {
          url: `${TRAINER_BASE}/personal-info`,
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['TrainerApplication']
    }),

    // SUBMIT PROFESSIONAL INFO (multipart)
    submitProfessionalInfo: builder.mutation<IProfessionalInfoApiResponse, ProfessionalInfoPayload>({
      query: (payload) => {
        const formData = new FormData();

        payload.specialization.forEach((s) => formData.append('specialization[]', s));

        formData.append('yearsOfExperience', String(payload.yearsOfExperience));
        formData.append('portfolio[bio]', payload.portfolio.bio);

        payload.portfolio.achievements?.forEach((a) => formData.append('portfolio[achievements][]', a));

        if (payload.portfolio.socialLinks) {
          Object.entries(payload.portfolio.socialLinks).forEach(([k, v]) => {
            if (v !== undefined && v !== null) {
              formData.append(`portfolio[socialLinks][${k}]`, v);
            }
          });
        }

        payload.additionalSkills?.forEach((s) => formData.append('additionalSkills[]', s));

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
                formData.append('certificates', file, file.name);
              }
            }
          });
        }

        return {
          url: `${TRAINER_BASE}/professional-info`,
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['TrainerApplication']
    }),

    // SUBMIT WORK INFO
    submitWorkInfo: builder.mutation<IWorkInfoApiResponse, WorkInfoPayload>({
      query: (payload) => ({
        url: `${TRAINER_BASE}/work-info`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['TrainerApplication']
    }),

    // SUBMIT IDENTITY INFO (multipart)
    submitIdentityInfo: builder.mutation<ITrainerIdentityApiResponse, IdentityInfoPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append('documentType', payload.documentType);

        if (payload.frontImage) {
          formData.append('frontImage', payload.frontImage, payload.frontImage.name);
        }
        if (payload.backImage) {
          formData.append('backImage', payload.backImage, payload.backImage.name);
        }

        return {
          url: `${TRAINER_BASE}/identity`,
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['TrainerApplication']
    })
  })
});

export const {
  useFetchFullInfoQuery,
  useSubmitPersonalInfoMutation,
  useSubmitProfessionalInfoMutation,
  useSubmitWorkInfoMutation,
  useSubmitIdentityInfoMutation
} = trainerApplicationApi;