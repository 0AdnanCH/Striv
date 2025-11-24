'use client';

import WorkInfoForm from '../components/forms/WorkInfoForm'; 
import { cn } from '../../../utils/cn.util';

const WorkInfoPage = () => {
  const handleNext = (data: any) => {
    console.log('Work Info Step Data:', data);

    // redirect to next final step OR call backend here:
    // router.push("/onboarding/summary");
  };

  return (
    <div className={cn('min-h-screen w-full bg-gradient-to-br from-white via-striv-muted/10 to-striv-accent/5', 'flex flex-col items-center py-10 px-4')}>
      {/* Page Header */}
      <div className="w-full max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Work Information</h1>
        <p className="mt-2 text-gray-600 text-base">Set your training rates and choose when you're available. This helps us match clients with your schedule.</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-striv-muted/40 shadow-xl rounded-xl p-6 md:p-8">
        <WorkInfoForm onNext={handleNext} />
      </div>

      {/* Footer (Optional, same as step 1 & 2) */}
      <div className="mt-10 text-center text-sm text-gray-500">Step 3 of 3 — Complete your profile setup</div>
    </div>
  );
};

export default WorkInfoPage;