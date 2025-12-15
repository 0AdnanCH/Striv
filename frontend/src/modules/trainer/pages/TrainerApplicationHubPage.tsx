import { AccountLayout } from '../../../components/layout/AccountLayout'; 
import { TrainerApplicationHub } from '../components/trainer-hub/TrainerApplicationHub'; 
import { mockTrainerData } from '../mockData'; 

const TrainerApplicationHubPage = () => {
  const trainerData = mockTrainerData;

  return (
    <AccountLayout>
      <TrainerApplicationHub initialData={trainerData} />
    </AccountLayout>
  );
};

export default TrainerApplicationHubPage;