'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock } from 'lucide-react';

import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '@radix-ui/react-label';

import { changePasswordSchema, type ChangePasswordSchemaType } from '../../../schemas'; 

interface BaseChangePasswordFormProps {
  loading?: boolean;
  onSubmit: (values: ChangePasswordSchemaType) => void;
}

export const BaseChangePasswordForm: React.FC<BaseChangePasswordFormProps> = ({ loading = false, onSubmit }) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const toggle = (field: 'current' | 'new' | 'confirm') => setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  // react-hook-form + zod integration
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched'
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-md 
      border border-striv-muted/40 rounded-2xl p-8 
      shadow-md space-y-6"
    >
      {/* TITLE USING RADIX LABEL */}
      <div className="flex items-center gap-3 mb-2">
        <Lock className="text-striv-primary" />
        <Label className="text-xl font-semibold text-striv-primary mb-2">Change Password</Label>
      </div>

      {/* CURRENT PASSWORD */}
      <div className="space-y-1">
        <Label className="block mb-2">Current Password</Label>
        <div className="relative">
          <Input {...register('currentPassword')} type={showPassword.current ? 'text' : 'password'} placeholder="Enter current password" />
          <button type="button" onClick={() => toggle('current')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {showPassword.current ? <Eye /> : <EyeOff />}
          </button>
        </div>
        {errors.currentPassword && <p className="text-red-600 text-sm">{errors.currentPassword.message}</p>}
      </div>

      {/* NEW PASSWORD */}
      <div className="space-y-1">
        <Label className="block mb-2">New Password</Label>
        <div className="relative">
          <Input {...register('newPassword')} type={showPassword.new ? 'text' : 'password'} placeholder="Enter new password" />
          <button type="button" onClick={() => toggle('new')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {showPassword.new ? <Eye /> : <EyeOff />}
          </button>
        </div>
        {errors.newPassword && <p className="text-red-600 text-sm">{errors.newPassword.message}</p>}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="space-y-1">
        <Label className="block mb-2">Confirm New Password</Label>
        <div className="relative">
          <Input {...register('confirmPassword')} type={showPassword.confirm ? 'text' : 'password'} placeholder="Confirm new password" />
          <button type="button" onClick={() => toggle('confirm')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {showPassword.confirm ? <Eye /> : <EyeOff />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      {/* SUBMIT */}
      <Button type="submit" disabled={loading} className="w-full bg-striv-primary text-white hover:bg-striv-accent transition">
        {loading ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
};