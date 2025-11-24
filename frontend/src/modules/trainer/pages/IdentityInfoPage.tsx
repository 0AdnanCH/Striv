'use client';

import IdentityInfoForm from '../components/forms/IdentityInfoForm'; 
import { Button } from '../../../components/ui/Button'; 

const IdentityInfoPage = () => {

  const handleNext = (data: any) => {
    console.log('Identity Step completed:', data);

    // Example: Combine with previous steps or store in global state
    // Then navigate to a final review/submission page
    // router.push('/trainer/kyc/review');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">Identity Verification</h1>
        <p className="mt-2 text-gray-600 text-base">Please upload valid identification documents to verify your identity. Make sure the images are clear and readable.</p>

        {/* STEP INDICATOR */}
        <div className="mt-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-primary" /> {/* step 4 active */}
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white/60 backdrop-blur-sm border border-striv-muted/50 shadow-sm rounded-lg p-6">
        <IdentityInfoForm onNext={handleNext} />
      </div>

      {/* OPTIONAL BACK BUTTON OUTSIDE FORM */}
      <div className="mt-6 flex justify-start">
        <Button variant="outline" onClick={() => console.log('Back to WorkInfo')}>
          ← Back to Work Information
        </Button>
      </div>
    </div>
  );
};

export default IdentityInfoPage;