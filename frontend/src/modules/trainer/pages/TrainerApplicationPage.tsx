import React, { useEffect } from 'react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ProfessionalInfoForm from '../components/forms/ProfessionalInfoForm';
import WorkInfoForm from '../components/forms/WorkInfoForm';
import IdentityInfoForm from '../components/forms/IdentityInfoForm';
import { cn } from '../../../utils/cn.util'; 
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useTrainerApplication } from '../hooks/useTrainerApplication';
import { TrainerApplicationStatus } from '../constants/trainerApplicationStatus.constant';
import { useDispatch } from 'react-redux';
import { trainerApplicationApi } from '../api/trainerApplication.api';

const TrainerApplicationPage: React.FC = () => {
  const dispatch = useDispatch();

  const {
    loading,
    trainerInfo,
    isError,
    submitPersonalInfo,
    submitProfessionalInfo,
    submitWorkInfo,
    submitIdentityInfo,
  } = useTrainerApplication();

  useEffect(() => {
    return () => {
      dispatch(trainerApplicationApi.util.invalidateTags(['TrainerApplication']));
    };
  }, []);

  if (!trainerInfo && loading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen />
  }

  if (trainerInfo?.applicationStatus && trainerInfo?.applicationStatus === TrainerApplicationStatus.COMPLETED) {
    return <Navigate to="/trainer/application/completed" replace />;
  }

  const currentStep = trainerInfo?.applicationStep ?? 1;
  // const currentStep = 1;
  
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            loading={loading}
            onNext={submitPersonalInfo}
            defaultValues={trainerInfo?.personalInfo ?? undefined}
          />
        );
      case 2:
        return (
          <ProfessionalInfoForm
            loading={loading}
            onNext={submitProfessionalInfo}
          />
        );
      case 3:
        return (
          <WorkInfoForm
            loading={loading}
            onNext={submitWorkInfo}
          />
        );
      case 4:
        return (
          <IdentityInfoForm
            loading={loading}
            onNext={submitIdentityInfo}
          />
        );
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

export default TrainerApplicationPage;

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-striv-bg">
    <p className="text-gray-700 text-lg font-medium">Loading your trainer profile...</p>
  </div>
);

const ErrorScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-striv-bg px-4">
    <div className="bg-white p-6 rounded-xl shadow-md">
      <p className="text-red-600 font-semibold">Failed to load trainer data.</p>
      <p className="text-gray-600 text-sm mt-1">Please refresh or try again later.</p>
    </div>
  </div>
);
