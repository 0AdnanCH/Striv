import React from 'react';
import AuthSignInForm from '../components/forms/SigninForm';
import { useAuth } from '../hooks/useAuth'; 

const SigninPage: React.FC = () => {
  const {signIn, googleLogin, loading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-striv-bg px-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <AuthSignInForm onSubmit={signIn} onGoogleSignin={googleLogin} loading={loading} />
      </div>
    </div>
  );
}

export default SigninPage;