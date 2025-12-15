import { AlertCircle, Save } from 'lucide-react';

// Types & Hooks
import type { ITrainerFullInfo } from '../../types/trainerApplication.types'; // Adjust path
import { useTrainerApplicationHub } from '../../hooks/useTrainerApplicationHub'; 
import { TrainerApplicationStatus } from '../../constants/trainerApplicationStatus.constant';

// Child Components
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { ProfessionalInfoSection } from './sections/ProfessionalInfoSection';
import { WorkInfoSection } from './sections/WorkInfoSection';
import { IdentityInfoSection } from './sections/IdentityInfoSection';

export const TrainerApplicationHub = ({ initialData }: { initialData: ITrainerFullInfo }) => {
  const { state, computed, actions } = useTrainerApplicationHub(initialData);

  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-striv-primary mb-2">Trainer Application Hub</h1>
        <p className="text-striv-secondary">Manage and review your application details.</p>
      </header>

      {/* Status Banner */}
      <div className="mb-8">
        {state.formData.applicationStatus === TrainerApplicationStatus.REVISION_REQUIRED && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start animate-pulse-slow">
            <AlertCircle className="text-red-500 mt-1 shrink-0" />
            <div>
              <h4 className="font-bold text-red-700">Action Required</h4>
              <p className="text-sm text-red-600">Please correct the highlighted issues.</p>
            </div>
          </div>
        )}
      </div>

      {/* --- MODULAR SECTIONS --- */}

      <PersonalInfoSection
        data={state.formData.personalInfo}
        isEditing={state.editingSections.personal}
        canEdit={computed.isApplicationEditable}
        onEdit={() => actions.toggleSectionEdit('personal')}
        onCancel={() => actions.handleCancelSection('personal', 'personalInfo')}
        onChange={(field, val) => actions.updateSection('personalInfo', field, val)}
      />

      <ProfessionalInfoSection
        data={state.formData.professionalInfo}
        isEditing={state.editingSections.professional}
        canEdit={computed.isApplicationEditable}
        onEdit={() => actions.toggleSectionEdit('professional')}
        onCancel={() => actions.handleCancelSection('professional', 'professionalInfo')}
        onUpdate={(field, val) => actions.updateSection('professionalInfo', field, val)}
        onPortfolioUpdate={actions.updatePortfolio}
        onSocialUpdate={actions.updateSocial}
      />

      <WorkInfoSection
        data={state.formData.workInfo}
        isEditing={state.editingSections.work}
        canEdit={computed.isApplicationEditable}
        onEdit={() => actions.toggleSectionEdit('work')}
        onCancel={() => actions.handleCancelSection('work', 'workInfo')}
        onChange={(field, val) => actions.updateSection('workInfo', field, val)}
      />

      <IdentityInfoSection
        data={state.formData.identityInfo}
        isEditing={state.editingSections.identity}
        canEdit={computed.isApplicationEditable}
        onEdit={() => actions.toggleSectionEdit('identity')}
        onCancel={() => actions.handleCancelSection('identity', 'identityInfo')}
        onChange={(field, val) => actions.updateSection('identityInfo', field, val)}
      />

      {/* Floating Footer */}
      {computed.hasActiveEdits && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-striv-muted shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-4 z-40 animate-slide-up">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-striv-secondary hidden sm:block">
              <span className="font-bold text-striv-primary">Unsaved Changes</span> • Please save before leaving.
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={actions.handleCancelAll}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border-2 border-striv-muted text-striv-secondary font-bold hover:bg-gray-50 transition-colors"
              >
                Discard All
              </button>
              <button
                onClick={actions.openConfirmModal}
                className="flex-1 sm:flex-none bg-striv-primary text-white px-6 py-2.5 rounded-lg flex justify-center items-center gap-2 font-bold hover:bg-striv-accent shadow-lg transition-colors"
              >
                <Save size={18} /> Submit Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Placeholder - Connect your BaseConfirmModal here */}
      {state.showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          {/* Implement your BaseConfirmModal here passing actions.closeConfirmModal */}
          <div className="bg-white p-8 rounded">Modal Placeholder</div>
        </div>
      )}
    </div>
  );
};