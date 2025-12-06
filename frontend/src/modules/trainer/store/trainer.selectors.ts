import type { RootState } from "../../../app/store";

// Root selector for trainer slice
export const selectTrainerState = (state: RootState) => state.trainer;

// Full info
export const selectTrainerFullInfo = (state: RootState) => state.trainer.fullInfo;

// Individual sections (always return null if not present)

export const selectTrainerPersonalInfo = (state: RootState) =>
  state.trainer.fullInfo?.personalInfo ?? null;

export const selectTrainerProfessionalInfo = (state: RootState) =>
  state.trainer.fullInfo?.professionalInfo ?? null;

export const selectTrainerWorkInfo = (state: RootState) =>
  state.trainer.fullInfo?.workInfo ?? null;

export const selectTrainerIdentityInfo = (state: RootState) =>
  state.trainer.fullInfo?.identityInfo ?? null;

export const selectTrainerApplicationStep = (state: RootState) =>
  state.trainer.fullInfo?.applicationStep ?? 1;

// Loading & error

export const selectTrainerLoading = (state: RootState) => state.trainer.loading;

export const selectTrainerError = (state: RootState) => state.trainer.error;