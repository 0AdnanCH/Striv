import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';
import type { SignInData } from '../../types';

interface SignInFormProps {
  onSubmit: (data: SignInData) => void;
  loading?: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({onSubmit, loading }) => {
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-striv-muted/40 bg-white/80 backdrop-blur-sm')}>
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-striv-primary">Welcome back 👋</h2>
      <p className="text-sm text-center text-striv-secondary mb-2">Sign in to continue your Striv journey</p>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
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