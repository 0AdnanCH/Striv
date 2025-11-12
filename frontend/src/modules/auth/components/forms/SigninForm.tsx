import React from 'react';
import BaseSigninForm from '../../../../components/forms/BaseSigninForm';
import { type SigninSchema } from '../../schemas';

interface AuthSigninFormProps {
  onSubmit: (data: SigninSchema) => void;
  onGoogleSignin: () => void;
  loading?: boolean;
}

const AuthSignInForm: React.FC<AuthSigninFormProps> = ({onSubmit, onGoogleSignin, loading }) => {
  return (
    <BaseSigninForm
      onSubmit={onSubmit}
      showGoogleButton={true}
      onGoogleSignin={onGoogleSignin}
      loading={loading}
      title="Welcome back 👋"
      subtitle="Sign in to continue your Striv journey"
      buttonText="Sign In"
      bottomLink={{
        text: 'Don’t have an account?',
        href: '/signup',
        linkText: 'Sign up'
      }}
      forgotPassword={{
        text: 'Forgot Password?',
        href: '/forgot-password'
      }}
      theme={{
        primary: 'text-striv-primary',
        accent: 'from-striv-primary to-striv-accent',
        background: 'bg-white/60 backdrop-blur-sm',
        border: 'border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'
      }}
    />
  );
}

export default AuthSignInForm;