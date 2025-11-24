import ProfessionalInfoForm from '../components/forms/ProfessionalInfoForm'; 

const ProfessionalInfoPage = () => {
  const handleNext = (data: any) => {
    console.log('Step 2 Completed:', data);
    // navigate to Step 3 (optional)
    // router.push('/trainer/registration/step-3');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-striv-bg px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="rounded-xl shadow-lg border border-striv-muted/40 bg-white/70 backdrop-blur-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Professional Information</h2>

          <p className="text-sm text-gray-600 mb-8">Provide your professional details, certificates, skills, and portfolio links. This helps clients and the Striv team understand your expertise.</p>

          <ProfessionalInfoForm onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoPage;