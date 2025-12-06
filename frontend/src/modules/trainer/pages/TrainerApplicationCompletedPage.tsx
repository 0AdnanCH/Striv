import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainerApplicationCompletedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-striv-bg flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        {/* Success Icon */}
        <CheckCircle className="mx-auto h-16 w-16 text-striv-primary" />

        {/* Title */}
        <h1 className="mt-6 text-2xl font-bold text-gray-800">Application Submitted Successfully</h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-600 leading-relaxed">
          Thank you for completing the trainer registration process. Our team will review your information and notify you once your profile is approved.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 my-6" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="bg-striv-primary text-white py-2.5 rounded-lg font-medium shadow-md hover:bg-striv-accent transition-all">
            Go to Home
          </Link>

          <Link to="/trainer/dashboard" className="text-striv-primary font-medium hover:underline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerApplicationCompletedPage;