import React from 'react';
import TrainerPersonalInfoForm from '../components/forms/PersonalInfoForm';

const TrainerPersonalInfoPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-striv-bg" style={{ background: 'var(--color-striv-bg)' }}>
      <div className="w-full px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <h1 className="mb-4 text-xl font-semibold text-gray-800">Trainer registration — Step 1: Personal information</h1>
            <p className="mb-6 text-sm text-gray-600">Fill out your basic personal details. All fields are required.</p>

            <div className="flex justify-center">
              <div className="w-full">
                <TrainerPersonalInfoForm
                  onNext={() => {
                    console.log('Received step1 data on page:');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPersonalInfoPage;