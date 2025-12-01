import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../../utils/cn.util';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '@radix-ui/react-label';
import { emailSchema, type EmailSchemaType } from '../../../schemas';

// ✅ Props Interface
interface BaseForgotPasswordFormProps {
  onSubmit: (data: EmailSchemaType) => void;
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
    primary: string;
    accent: string;
    background: string;
    border: string;
  };
}

// ✅ Default Theme (Striv Colors)
const defaultTheme = {
  primary: 'text-striv-primary',
  accent: 'from-striv-primary to-striv-accent',
  background: 'bg-white/80',
  border: 'border-striv-muted/40'
};

// ✅ Base Forgot Password Form Component
export const BaseForgotPasswordForm: React.FC<BaseForgotPasswordFormProps> = ({
  onSubmit,
  loading = false,
  title = 'Forgot Password?',
  subtitle = 'Enter your email to receive reset instructions',
  buttonText = 'Send Reset Link',
  bottomLink,
  theme = defaultTheme
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur'
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300', theme.background, `border ${theme.border}`)}
    >
      {/* Title */}
      <h2 className={cn('text-3xl font-bold text-center', theme.primary)}>{title}</h2>
      <p className={cn('text-sm text-center mb-2 opacity-70', theme.primary)}>{subtitle}</p>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register('email')} className={cn('focus:ring-2 focus:ring-offset-1', theme.border)} />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className={cn('w-full h-11 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform duration-200', `bg-gradient-to-r ${theme.accent}`)}
      >
        {loading ? 'Sending...' : buttonText}
      </Button>

      {/* Bottom Link */}
      {bottomLink && (
        <p className="text-sm text-center opacity-80">
          {bottomLink.text}{' '}
          <a href={bottomLink.href} className={cn('font-semibold hover:underline', theme.primary)}>
            {bottomLink.linkText}
          </a>
        </p>
      )}
    </form>
  );
};