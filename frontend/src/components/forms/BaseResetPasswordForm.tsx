import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Label } from '@radix-ui/react-label';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn.util';
import { resetPasswordSchema, type ResetPasswordSchema } from '../../schemas/resetPassword.schema';

// ✅ Props Interface (Scalable / Themeable)
interface BaseResetPasswordFormProps {
  onSubmit: (data: ResetPasswordSchema) => void;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  theme?: {
    primary: string;
    accent: string;
    background: string;
    border: string;
  };
}

// ✅ Default Striv Theme
const defaultTheme = {
  primary: 'text-striv-primary',
  accent: 'from-striv-primary to-striv-accent',
  background: 'bg-white/80 backdrop-blur-sm',
  border: 'border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'
};

const BaseResetPasswordForm: React.FC<BaseResetPasswordFormProps> = ({
  onSubmit,
  loading = false,
  title = 'Reset Your Password',
  subtitle = 'Enter your new password below',
  buttonText = 'Reset Password',
  theme = defaultTheme
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur'
  });

  const handleFormSubmit = (data: ResetPasswordSchema) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg transition-all duration-300', theme.background, theme.border)}>
      {/* ✅ Title */}
      <h2 className={cn('text-3xl font-bold text-center', theme.primary)}>{title}</h2>
      <p className={cn('text-sm text-center opacity-70', theme.primary)}>{subtitle}</p>

      {/* ✅ New Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} className={cn('pr-10', theme.border)} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={cn('absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition-colors', theme.primary)}
            tabIndex={-1}
          >
            {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {/* ✅ Confirm Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <div className="relative">
          <Input id="confirm_password" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" {...register('confirm_password')} className={cn('pr-10', theme.border)} />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={cn('absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition-colors', theme.primary)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirm_password && <p className="text-sm text-red-500">{errors.confirm_password.message}</p>}
      </div>

      {/* ✅ Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className={cn('w-full h-11 text-white font-semibold hover:scale-[1.02] hover:shadow-lg transition-transform duration-200', `bg-gradient-to-r ${theme.accent}`)}
      >
        {loading ? 'Resetting...' : buttonText}
      </Button>
    </form>
  );
};

export default BaseResetPasswordForm;