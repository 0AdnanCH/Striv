import React from 'react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ProfessionalInfoForm from '../components/forms/ProfessionalInfoForm';
import WorkInfoForm from '../components/forms/WorkInfoForm';
import IdentityInfoForm from '../components/forms/IdentityInfoForm';
import { cn } from '../../../utils/cn.util'; 
import { useTrainerRegistration } from '../hooks/useTrainerRegistration';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainerRegistrationPage: React.FC = () => {

  const {
    currentStep,
    loading,
    goPrev,
    submitPersonalInfo,
    submitProfessionalInfo,
    submitWorkInfo,
    submitIdentityInfo,
  } = useTrainerRegistration();
  

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm loading={loading} onNext={submitPersonalInfo} />;
      case 2:
        return <ProfessionalInfoForm loading={loading} onNext={submitProfessionalInfo} onPrev={goPrev} />;
      case 3:
        return <WorkInfoForm loading={loading} onNext={submitWorkInfo} onPrev={goPrev} />;
      case 4:
        return <IdentityInfoForm loading={loading} onNext={submitIdentityInfo} onPrev={goPrev} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-striv-bg px-4 py-10 relative">
      {/* BACK BUTTON (Top-left of entire page) */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white px-3 py-2 
                  rounded-full shadow-md hover:bg-gray-100 transition-all"
      >
        <ArrowLeft className="h-5 w-5 text-striv-primary" />
        <span className="text-sm font-medium text-gray-700">Back to Home</span>
      </Link>

      {/* PAGE CENTER CONTENT */}
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            {/* STEP TITLE */}
            <h1 className="mb-2 text-xl font-bold text-gray-800">Trainer Registration — Step {currentStep} of 4</h1>
            <p className="text-sm text-gray-600 mb-6">Complete all steps to register as a trainer on Striv.</p>

            {/* PROGRESS INDICATOR */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn('h-2 rounded-full transition-all duration-300', currentStep >= i ? 'bg-striv-primary' : 'bg-gray-300', i === currentStep ? 'w-12' : 'w-8')} />
              ))}
            </div>

            {/* FORM */}
            <div>{renderStepForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerRegistrationPage;