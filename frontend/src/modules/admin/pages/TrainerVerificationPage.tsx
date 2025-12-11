import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, AlertCircle, ChevronRight, 
  ExternalLink, Calendar, DollarSign, ZoomIn, FileText, ArrowLeft, 
  Users,
  ClipboardCheck
} from 'lucide-react';
import { cn } from '../../../utils/cn.util'; // Your util path
import AdminHeader from '../components/layout/AdminHeader';  // Your Header
import AdminSidebar from '../components/layout/AdminSidebar'; // Your Sidebar
import { MOCK_TRAINER_DATA, type VerificationState, type RejectionFeedback } from '../types/adminTrainerVerification.types' // Import data

// --- SUB-COMPONENTS ---

// 1. Status Badge Helper
const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'VALID') return <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full"><CheckCircle2 size={12} /> VERIFIED</span>;
  if (status === 'INVALID') return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full"><XCircle size={12} /> REJECTED</span>;
  return <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full"><AlertCircle size={12} /> PENDING</span>;
};

// 2. Data Row Helper
const DetailRow = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ElementType }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-100 last:border-0">
    <dt className="w-1/3 text-sm font-medium text-slate-500 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-slate-400" />} {label}
    </dt>
    <dd className="w-2/3 text-sm text-slate-900 font-medium mt-1 sm:mt-0">{value || '-'}</dd>
  </div>
);

// 3. Image Viewer (Zoomable)
const IdentityImageViewer = ({ src, label }: { src: string; label: string }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all duration-300 cursor-zoom-in",
          isZoomed ? "h-[500px]" : "h-48"
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img 
          src={src} 
          alt={label} 
          className={cn("w-full h-full object-contain transition-transform duration-500", isZoomed ? "scale-150" : "scale-100")}
        />
        {!isZoomed && (
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              <ZoomIn size={14} /> Click to Inspect
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const TrainerVerificationPage = () => {
  // State
  const [activeTab, setActiveTab] = useState<keyof VerificationState>('personal');
  
  // Verification Logic State
  const [verificationStatus, setVerificationStatus] = useState<VerificationState>({
    personal: 'PENDING',
    professional: 'PENDING',
    work: 'PENDING',
    identity: 'PENDING',
  });

  const [feedback, setFeedback] = useState<RejectionFeedback>({
    personal: '',
    professional: '',
    work: '',
    identity: '',
  });

  // Actions
  const handleVerify = (section: keyof VerificationState, isValid: boolean) => {
    setVerificationStatus(prev => ({ ...prev, [section]: isValid ? 'VALID' : 'INVALID' }));
    // Clear feedback if valid
    if (isValid) setFeedback(prev => ({ ...prev, [section]: '' }));
  };

  const isAllValid = Object.values(verificationStatus).every(s => s === 'VALID');
  const hasRejections = Object.values(verificationStatus).some(s => s === 'INVALID');

  // --- CONTENT RENDERERS ---

  const renderContent = () => {
    const data = MOCK_TRAINER_DATA;

    switch (activeTab) {
      case 'personal':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-6 mb-8">
              <img src={data.personal.profile_photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm" />
              <div>
                <h3 className="text-xl font-bold text-slate-800">{data.personal.first_name} {data.personal.last_name}</h3>
                <p className="text-slate-500 text-sm">Age: {data.personal.age} • {data.personal.gender}</p>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Applicant
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Basic Details</h4>
              <dl>
                <DetailRow label="First Name" value={data.personal.first_name} />
                <DetailRow label="Last Name" value={data.personal.last_name} />
                <DetailRow label="Phone Number" value={data.personal.phone} />
                <DetailRow label="Gender" value={data.personal.gender} />
              </dl>
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Expertise</h4>
              <dl>
                <DetailRow label="Years of Exp." value={`${data.professional.yearsOfExperience} Years`} />
                <DetailRow label="Specializations" value={
                  <div className="flex flex-wrap gap-2">
                    {data.professional.specialization.map(s => (
                      <span key={s} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200">{s}</span>
                    ))}
                  </div>
                } />
                <DetailRow label="Skills" value={data.professional.additionalSkills?.join(', ')} />
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Certifications</h4>
              {data.professional.certificates?.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md border border-slate-100">
                      <FileText size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{cert.title}</p>
                      <p className="text-xs text-slate-500">{cert.issuer} • {cert.issuedDate ? new Date(cert.issuedDate).getFullYear() : 'N/A'}</p>
                    </div>
                  </div>
                  {cert.fileUrl && (
                    <a href={cert.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                      View PDF <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
               <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Portfolio Links</h4>
               <div className="flex gap-4">
                  {data.professional.portfolio.socialLinks?.instagram && (
                    <a href={data.professional.portfolio.socialLinks.instagram} target="_blank" className="text-pink-600 hover:underline text-sm flex items-center gap-1">Instagram <ExternalLink size={12}/></a>
                  )}
                  {data.professional.portfolio.socialLinks?.linkedin && (
                    <a href={data.professional.portfolio.socialLinks.linkedin} target="_blank" className="text-blue-700 hover:underline text-sm flex items-center gap-1">LinkedIn <ExternalLink size={12}/></a>
                  )}
               </div>
            </div>
          </div>
        );

      case 'work':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3"><DollarSign /></div>
                    <p className="text-slate-500 text-sm font-medium">1-on-1 Session</p>
                    <p className="text-2xl font-bold text-slate-900">${data.work.pricing.oneToOne}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3"><Users size={20} /></div>
                    <p className="text-slate-500 text-sm font-medium">Group Session</p>
                    <p className="text-2xl font-bold text-slate-900">${data.work.pricing.groupSession}</p>
                </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Availability Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.work.availability.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Calendar size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 uppercase">{slot.day}</p>
                        <p className="text-xs text-slate-500">{slot.startTime} - {slot.endTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        );

      case 'identity':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
              <AlertCircle className="text-blue-600 shrink-0" size={20} />
              <p className="text-sm text-blue-800">
                Verify the name on the document matches <strong>{data.personal.first_name} {data.personal.last_name}</strong> and the photo is clear.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 border-b pb-2">
                {data.identity.documentType.replace('_', ' ')}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <IdentityImageViewer src={data.identity.frontImage} label="Front Side" />
                {data.identity.backImage ? (
                   <IdentityImageViewer src={data.identity.backImage} label="Back Side" />
                ) : (
                  <div className="h-48 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
                    <span className="text-sm text-slate-400">No Back Side Uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  // --- RENDER ---
  return (
    <div className="flex bg-slate-50 h-screen font-sans text-slate-600">
      {/* 1. Sidebar */}
      <AdminSidebar />

      {/* 2. Main Layout Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader title="Verify Trainer Application" />

        <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row">
          
          {/* A. Verification Navigation (Left Panel) */}
          <div className="w-full md:w-80 bg-white border-r border-slate-200 h-full overflow-y-auto z-10">
            <div className="p-6 border-b border-slate-100">
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors">
                <ArrowLeft size={16} /> Back to List
              </button>
              <h2 className="text-lg font-bold text-slate-900">Sections</h2>
              <p className="text-xs text-slate-500 mt-1">Review all 4 sections to enable approval.</p>
            </div>
            
            <nav className="p-4 space-y-2">
              {(Object.keys(verificationStatus) as Array<keyof VerificationState>).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveTab(section)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group text-left",
                    activeTab === section 
                      ? "bg-blue-50 border-blue-200 shadow-sm" 
                      : "bg-white border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-full absolute left-0 top-0 rounded-l-xl transition-all",
                      activeTab === section ? "bg-blue-600" : "bg-transparent"
                    )} />
                    <div>
                      <span className={cn(
                        "block text-sm font-semibold capitalize",
                        activeTab === section ? "text-blue-900" : "text-slate-700"
                      )}>
                        {section.replace('Info', '')} Info
                      </span>
                    </div>
                  </div>
                  {/* Status Indicator Icon */}
                  {verificationStatus[section] === 'VALID' && <CheckCircle2 size={18} className="text-green-500" />}
                  {verificationStatus[section] === 'INVALID' && <XCircle size={18} className="text-red-500" />}
                  {verificationStatus[section] === 'PENDING' && <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-slate-300" />}
                </button>
              ))}
            </nav>
          </div>

          {/* B. Content Area (Center) */}
          <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 pb-32">
            <div className="max-w-4xl mx-auto">
              
              {/* Header for Active Section */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 capitalize flex items-center gap-2">
                  {activeTab} Details
                  <StatusBadge status={verificationStatus[activeTab]} />
                </h2>
              </div>

              {/* The Dynamic Content */}
              {renderContent()}

              {/* Section Validation Box (The "Review" part) */}
              <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm ring-1 ring-slate-900/5">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ClipboardCheck size={18} className="text-slate-400"/>
                  Admin Decision for {activeTab}
                </h4>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleVerify(activeTab, true)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-lg font-medium border-2 transition-all flex items-center justify-center gap-2",
                      verificationStatus[activeTab] === 'VALID'
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-slate-200 text-slate-600 hover:border-green-200 hover:bg-green-50/50"
                    )}
                  >
                    <CheckCircle2 size={18} /> Mark as Valid
                  </button>

                  <button 
                    onClick={() => handleVerify(activeTab, false)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-lg font-medium border-2 transition-all flex items-center justify-center gap-2",
                      verificationStatus[activeTab] === 'INVALID'
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50/50"
                    )}
                  >
                    <XCircle size={18} /> Flag Issue
                  </button>
                </div>

                {/* Feedback Input (Only shows if Rejected) */}
                {verificationStatus[activeTab] === 'INVALID' && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Rejection</label>
                    <textarea 
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition"
                      placeholder={`E.g., The ${activeTab} document is blurry...`}
                      rows={3}
                      value={feedback[activeTab]}
                      onChange={(e) => setFeedback({ ...feedback, [activeTab]: e.target.value })}
                    />
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>

        {/* C. Bottom Action Bar (Sticky Verdict) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-end items-center gap-4 md:pl-80">
           <div className="mr-auto hidden md:block">
              <p className="text-sm font-medium text-slate-600">
                Summary: <span className="text-slate-900">{Object.values(verificationStatus).filter(s => s === 'VALID').length}/4 Verified</span>
              </p>
           </div>

           {/* Reject Button - Only Active if there are invalid sections */}
           <button 
             disabled={!hasRejections}
             className="px-6 py-2.5 rounded-lg font-bold text-red-600 bg-red-50 border border-transparent hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
           >
             Request Changes
           </button>

           {/* Approve Button - Only Active if ALL sections are VALID */}
           <button 
             disabled={!isAllValid}
             className="px-6 py-2.5 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20 transition flex items-center gap-2"
           >
             Approve Application <ChevronRight size={16} />
           </button>
        </div>

      </div>
    </div>
  );
};

export default TrainerVerificationPage;