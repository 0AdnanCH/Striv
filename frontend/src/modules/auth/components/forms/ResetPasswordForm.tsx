import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../components/ui/input'; 
import { Button } from '../../../../components/ui/button'; 
import { Label } from '@radix-ui/react-label';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../../../utils/cn.util'; 
import { resetPasswordSchema, type ResetPasswordSchemaType } from '../../schemas'; 
import type { IResetPasswordData } from '../../types/auth.types'; 

interface ResetPasswordFormProps {
  onSubmit: (data: Omit<IResetPasswordData, 'token'>) => void;
  loading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur'
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'flex flex-col gap-6 w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg transition-all duration-300',
        'bg-white/60 backdrop-blur-sm',
        'border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'
      )}
    >
      {/* ✅ Title */}
      <h2 className={'text-3xl font-bold text-center text-striv-primary'}>Create New Password</h2>
      <p className={'text-sm text-center opacity-70 text-striv-primary'}>Your new password should be strong and different from your previous ones.</p>

      {/* ✅ New Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            className={'pr-10 border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={'absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition-colors text-striv-primary'}
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
          <Input
            id="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('confirm_password')}
            className={'pr-10 border border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40'}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={'absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition-colors text-striv-primary'}
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
        className={'w-full h-11 text-white font-semibold hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 bg-gradient-to-r from-striv-primary to-striv-accent'}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;