import React from 'react';
import SignInForm from '../../components/forms/SignInForm';
import { useAuth } from '../../hooks/useAuth';
import type { SignInData } from '../../types';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const {signIn, loading} = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (data: SignInData) => {
    try {
      const response = await signIn(data);
      console.log('Signin successful:', response);

      navigate('/');
    } catch (error: any) {
      console.error('Signin failed:', error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-striv-bg px-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <SignInForm onSubmit={handleSignIn} loading={loading} />
      </div>
    </div>
  );
}

export default SignInPage;