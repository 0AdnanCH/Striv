import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInSchema } from '../../validations';

import { Input } from '../ui/Input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn.util';
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormProps {
  onSubmit: (data: SignInSchema) => void;
  loading?: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })

  const handleFormSubmit = (data: SignInSchema) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-striv-muted/40 bg-white/80 backdrop-blur-sm')}>
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-striv-primary">Welcome back 👋</h2>
      <p className="text-sm text-center text-striv-secondary mb-2">Sign in to continue your Striv journey</p>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className="pr-10" // add space for eye icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-striv-primary transition-colors"
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
        className="w-full h-11 bg-gradient-to-r from-striv-primary to-striv-accent text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Bottom Link */}
      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{' '}
        <a href="/signup" className="text-striv-primary font-semibold hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}

export default SignInForm;