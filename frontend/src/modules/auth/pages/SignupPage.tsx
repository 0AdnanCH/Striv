import React from 'react';
import SignupForm from '../components/forms/SignupForm'; 
import { cn } from '../../../utils/cn.util';
import { useAuth } from '../hooks/useAuth'; 
import type { SignupData } from '../types/auth.types'; 
import { handleApiError } from '../../../utils/handleApiError.util';

const SignupPage: React.FC = () => {
  const { signUp, loading } = useAuth();;

  const handleSignup = async (data: SignupData) => {
    try {
      await signUp(data);
    } catch (error: any) {
      handleApiError('Signup', error);
    }
  };

  return (
    <div className={cn('min-h-screen flex flex-col md:flex-row text-gray-900 bg-gradient-to-br from-striv-bg via-white to-striv-muted')}>
      {/* Left side - branding / image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-striv-primary via-striv-accent to-striv-secondary text-white justify-center items-center p-10">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight drop-shadow-md">Welcome to Striv</h1>
          <p className="text-base text-white/90 leading-relaxed">Your personalized fitness & wellness journey starts here. Connect with trainers, follow guided plans, and stay consistent 💪</p>
        </div>
      </div>

      {/* Right side - signup form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8">
          <SignupForm onSubmit={handleSignup} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;