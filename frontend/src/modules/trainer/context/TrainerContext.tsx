'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ITrainerFullInfoDraft } from '../types/trainerDraft.types';

interface TrainerContextState {
  trainerFullInfo: ITrainerFullInfoDraft | null;
  setTrainerFullInfo: (value: ITrainerFullInfoDraft | ((prev: ITrainerFullInfoDraft | null) => ITrainerFullInfoDraft)) => void;
  clearTrainerInfo: () => void;
}

const TrainerContext = createContext<TrainerContextState | undefined>(undefined);

export function TrainerProvider({ children }: { children: ReactNode }) {
  const [trainerFullInfo, setTrainerFullInfoState] = useState<ITrainerFullInfoDraft | null>(null);

  const setTrainerFullInfo = (value: ITrainerFullInfoDraft | ((prev: ITrainerFullInfoDraft | null) => ITrainerFullInfoDraft)) => {
    if (typeof value === 'function') {
      setTrainerFullInfoState((prev) => value(prev));
    } else {
      setTrainerFullInfoState(value);
    }
  };
  
  const clearTrainerInfo = () => {
    setTrainerFullInfoState(null);
  };

  return (
    <TrainerContext.Provider
      value={{
        trainerFullInfo,
        setTrainerFullInfo,
        clearTrainerInfo
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
}

export function useTrainerContext() {
  const ctx = useContext(TrainerContext);
  if (!ctx) {
    throw new Error('useTrainerContext must be used inside TrainerProvider');
  }
  return ctx;
}