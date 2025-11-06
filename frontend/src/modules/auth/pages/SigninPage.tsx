import React from 'react';
import AuthSignInForm from '../components/forms/SigninForm';
import { useAuth } from '../hooks/useAuth'; 
import type { SigninData } from '../types/auth.types';
import { handleApiError } from '../../../utils/handleApiError.util';

const SigninPage: React.FC = () => {
  const {signIn, loading} = useAuth();

  const handleSignIn = async (data: SigninData) => {
    try {
      await signIn(data);
    } catch (error: any) {
      handleApiError('Signin', error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-striv-bg px-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <AuthSignInForm onSubmit={handleSignIn} loading={loading} />
      </div>
    </div>
  );
}

export default SigninPage;