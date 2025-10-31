import React from 'react';
import SignUpForm from '../../components/forms/SignUpForm';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';
import type { SignUpData } from '../../types';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (data: SignUpData) => {
    try {
      const response = await signUp(data);
      console.log('Signup successful:', response);

      navigate('/');
    } catch (error: any) {
      console.error('Signup failed:', error);
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
          <SignUpForm onSubmit={handleSignUp} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;