import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn.util';
import { signinSchema, type SigninSchema } from '../../modules/auth/schemas';

interface BaseSigninFormProps {
  onSubmit: (data: SigninSchema) => void;
  onGoogleSignin?: () => void;
  showGoogleButton?: boolean;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  bottomLink?: {
    text: string;
    href: string;
    linkText: string;
  };
  theme?: {
    primary: string; // For text, headings, links
    accent: string; // For button gradients or highlights
    background: string; // For form background
    border: string; // For border or input outlines
  };
}

const BaseSigninForm: React.FC<BaseSigninFormProps> = ({
  onSubmit,
  onGoogleSignin,
  showGoogleButton = false,
  loading = false,
  title = 'Welcome Back 👋',
  subtitle = 'Sign in to continue your journey',
  buttonText = 'Sign In',
  bottomLink,
  theme = {
    primary: 'text-striv-primary',
    accent: 'from-striv-primary to-striv-accent',
    background: 'bg-white/80',
    border: 'border-striv-muted/40'
  }
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur'
  });

  const handleFormSubmit = (data: SigninSchema) => onSubmit(data);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300', theme.background, `border ${theme.border}`)}
    >
      {/* Title */}
      <h2 className={cn('text-3xl font-bold text-center', theme.primary)}>{title}</h2>
      <p className={cn('text-sm text-center mb-2', theme.primary, 'opacity-70')}>{subtitle}</p>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="you@example.com" className={cn('focus:ring-2 focus:ring-offset-1', theme.border)} />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} className={cn('pr-10 focus:ring-2 focus:ring-offset-1', theme.border)} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn('absolute inset-y-0 right-3 flex items-center transition-colors', theme.primary, 'opacity-70 hover:opacity-100')}
              tabIndex={-1}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>
      </div>

      {/* Button */}
      <Button
        type="submit"
        disabled={loading}
        className={cn('w-full h-11 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform duration-200', `bg-gradient-to-r ${theme.accent}`)}
      >
        {loading ? 'Signing in...' : buttonText}
      </Button>

      {/* Google Signin Button */}
      {showGoogleButton && (
        <button
          type="button"
          onClick={onGoogleSignin}
          className="w-full h-11 flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Sign in with Google
        </button>
      )}

      {/* Bottom Link */}
      {bottomLink && (
        <p className={cn('text-sm text-center opacity-80')}>
          {bottomLink.text}{' '}
          <a href={bottomLink.href} className={cn('font-semibold hover:underline', theme.primary)}>
            {bottomLink.linkText}
          </a>
        </p>
      )}
    </form>
  );
};

export default BaseSigninForm;