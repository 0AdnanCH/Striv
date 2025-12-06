import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  ITrainerFullInfo, 
  IPersonalInfo, 
  IProfessionalInfo, 
  IWorkInfo, 
  ITrainerIdentityInfo 
} from '../types/trainerApplication.types';
import { TrainerApplicationStatus } from '../constants/trainerApplicationStatus.constant';

export interface TrainerState {
  fullInfo: ITrainerFullInfo | null;
  loading: boolean;
  error: string | null;
}

// Helper to create a safe empty full info object
const createEmptyTrainerFullInfo = (): ITrainerFullInfo => ({
  personalInfo: null,
  professionalInfo: null,
  workInfo: null,
  identityInfo: null,
  applicationStep: 1,
  applicationStatus: TrainerApplicationStatus.NOT_STARTED,
});

// ---- Initial state ----
const initialState: TrainerState = {
  fullInfo: null,
  loading: false,
  error: null
};

// ---- Slice ----
export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    // Set everything at once
    setTrainerFullInfo(state, action: PayloadAction<ITrainerFullInfo>) {
      state.fullInfo = action.payload;
      state.error = null;
    },

    // Clear all trainer data
    clearTrainerFullInfo(state) {
      state.fullInfo = null;
      state.loading = false;
      state.error = null;
    },

    // Loading & error helpers
    setTrainerLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setTrainerError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    // ---- Section-specific updates ----
    // These keep the structure scalable and easy to maintain per step

    setTrainerPersonalInfo(state, action: PayloadAction<IPersonalInfo | null>) {
      if (!state.fullInfo) {
        state.fullInfo = createEmptyTrainerFullInfo();
      }
      state.fullInfo.personalInfo = action.payload;
    },

    setTrainerProfessionalInfo(state, action: PayloadAction<IProfessionalInfo | null>) {
      if (!state.fullInfo) {
        state.fullInfo = createEmptyTrainerFullInfo();
      }
      state.fullInfo.professionalInfo = action.payload;
    },

    setTrainerWorkInfo(state, action: PayloadAction<IWorkInfo | null>) {
      if (!state.fullInfo) {
        state.fullInfo = createEmptyTrainerFullInfo();
      }
      state.fullInfo.workInfo = action.payload;
    },

    setTrainerIdentityInfo(state, action: PayloadAction<ITrainerIdentityInfo | null>) {
      if (!state.fullInfo) {
        state.fullInfo = createEmptyTrainerFullInfo();
      }
      state.fullInfo.identityInfo = action.payload;
    },

    // Registration step can be managed independently
    setTrainerApplicationStep(state, action: PayloadAction<number>) {
      if (!state.fullInfo) {
        state.fullInfo = createEmptyTrainerFullInfo();
      }
      state.fullInfo.applicationStep = action.payload;
    }
  }
});

export const {
  setTrainerFullInfo,
  clearTrainerFullInfo,
  setTrainerLoading,
  setTrainerError,
  setTrainerPersonalInfo,
  setTrainerProfessionalInfo,
  setTrainerWorkInfo,
  setTrainerIdentityInfo,
  setTrainerApplicationStep
} = trainerSlice.actions;

export default trainerSlice.reducer;