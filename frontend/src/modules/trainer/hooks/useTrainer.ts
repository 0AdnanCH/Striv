import { useTrainerContext } from '../context/TrainerContext';

export function useTrainer() {
  const { trainerFullInfo, setTrainerFullInfo, clearTrainerInfo } = useTrainerContext();

  return {
    trainer: trainerFullInfo?.trainer || null,
    kyc: trainerFullInfo?.kyc || null,
    setTrainerFullInfo,
    clearTrainerInfo
  };
}