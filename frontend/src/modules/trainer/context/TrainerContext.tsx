// TrainerContext.tsx
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { TrainerFullInfo } from '../types/trainerRegistration.types';

interface TrainerContextState {
  trainerFullInfo: TrainerFullInfo | null;
  setTrainerFullInfo: (value: TrainerFullInfo | ((prev: TrainerFullInfo | null) => TrainerFullInfo)) => void;
  clearTrainerInfo: () => void;
}

const TrainerContext = createContext<TrainerContextState | undefined>(undefined);

export function TrainerProvider({ children }: { children: ReactNode }) {
  const [trainerFullInfo, setTrainerFullInfoState] = useState<TrainerFullInfo | null>(null);

  const setTrainerFullInfo = (value: TrainerFullInfo | ((prev: TrainerFullInfo | null) => TrainerFullInfo)) => {
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