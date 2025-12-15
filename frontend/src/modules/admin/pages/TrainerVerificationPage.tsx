import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ClipboardCheck, Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { cn } from '../../../utils/cn.util';

// Components
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import { TrainerPersonalInfoSection } from '../components/sections/TrainerPersonalInfoSection';
import { TrainerProfessionalInfoSection } from '../components/sections/TrainerProfessionalInfoSection';
import { TrainerWorkInfoSection } from '../components/sections/TrainerWorkInfoSection';
import { TrainerIdentityInfoSection } from '../components/sections/TrainerIdentityInfoSection';
import { TrainerVerificationSidebar } from '../components/layout/TrainerVerificationSidebar';
import { StatusBadge } from '../components/shared/StatusBadge';
import { TrainerVerificationActionBar } from '../components/layout/TrainerVerificationActionBar';

// Hook
import { useTrainerVerification } from '../hooks/useTrainerVerification';

const TrainerVerificationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    trainerData,
    loadApplicationData,
    isLoading,
    isSubmitting,
    error,
    activeTab,
    setActiveTab,
    verificationStatus,
    feedback,
    isAllValid,
    hasRejections,
    completedCount,
    handleVerifySection,
    handleFeedbackChange,
    submitApproval,
    submitRejection
  } = useTrainerVerification();

  useEffect(() => {
    if (id) {
      loadApplicationData(id);
    }
  }, [id, loadApplicationData]);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-slate-500 font-medium">Loading Application Data...</p>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error || !trainerData) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-red-100 rounded-full text-red-600">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Failed to Load Application</h2>
          <p className="text-slate-500 max-w-md mx-auto">{error || "Application data is missing."}</p>
          <button 
            onClick={() => navigate('/admin/trainer/applications')}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Go Back to List
          </button>
        </div>
      </div>
    );
  }

  // --- Render Section Helper ---
  const renderSectionContent = () => {
    switch (activeTab) {
      case 'personal': 
        return <TrainerPersonalInfoSection data={trainerData.personal} />;
      case 'professional': 
        return <TrainerProfessionalInfoSection data={trainerData.professional} />;
      case 'work': 
        return <TrainerWorkInfoSection data={trainerData.work} />;
      case 'identity': 
        return <TrainerIdentityInfoSection 
          data={{
            documentType: trainerData.identity.documentType as any,
            frontImage: trainerData.identity.frontImage,
            backImage: trainerData.identity.backImage
          }} 
          applicantName={`${trainerData.personal.first_name} ${trainerData.personal.last_name}`} 
        />;
      default: return null;
    }
  };

  // --- Main Render ---
  return (
    <div className="flex bg-slate-50 h-screen font-sans text-slate-600">
      
      {/* 1. Global Admin Sidebar */}
      <AdminSidebar />

      {/* 2. Main Layout Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <AdminHeader title="Verify Trainer Application" />

        {/* Content Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row">
          
          {/* A. Internal Navigation */}
          <TrainerVerificationSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            verificationStatus={verificationStatus} 
          />

          {/* B. Right Side Content */}
          <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-50/50">
            
            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              <div className="max-w-4xl mx-auto pb-10">
                
                {/* Back Button Mobile Only */}
                <button 
                  onClick={() => navigate('/admin/trainer/applications')}
                  className="md:hidden flex items-center gap-2 text-sm text-slate-500 mb-4"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 capitalize flex items-center gap-2">
                    {activeTab} Details
                    <StatusBadge status={verificationStatus[activeTab]} />
                  </h2>
                </div>

                {/* DYNAMIC CONTENT */}
                {renderSectionContent()}

                {/* Admin Decision Box */}
                <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm ring-1 ring-slate-900/5">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ClipboardCheck size={18} className="text-slate-400" />
                    Admin Decision for {activeTab}
                  </h4>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleVerifySection(activeTab, true)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-lg font-medium border-2 transition-all flex items-center justify-center gap-2',
                        verificationStatus[activeTab] === 'VALID' 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-slate-200 text-slate-600 hover:border-green-200 hover:bg-green-50/50'
                      )}
                    >
                      <CheckCircle2 size={18} /> Mark as Valid
                    </button>

                    <button
                      onClick={() => handleVerifySection(activeTab, false)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-lg font-medium border-2 transition-all flex items-center justify-center gap-2',
                        verificationStatus[activeTab] === 'INVALID' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50/50'
                      )}
                    >
                      <XCircle size={18} /> Flag Issue
                    </button>
                  </div>

                  {/* Feedback Text Area */}
                  {verificationStatus[activeTab] === 'INVALID' && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Rejection</label>
                      <textarea
                        className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition"
                        placeholder={`E.g., The ${activeTab} document is blurry or invalid...`}
                        rows={3}
                        value={feedback[activeTab]}
                        onChange={(e) => handleFeedbackChange(activeTab, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <TrainerVerificationActionBar
              completedCount={completedCount}
              totalCount={4}
              hasRejections={hasRejections}
              isAllValid={isAllValid}
              isSubmitting={isSubmitting}
              onApprove={submitApproval}
              onRequestChanges={submitRejection}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TrainerVerificationPage;