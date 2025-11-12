import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupSchema } from '../../schemas';

import { Input } from '../../../../components/ui/Input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../../../../components/ui/Button'; 
import { cn } from '../../../../utils/cn.util'; 
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '../../../../components/ui/Select';
import { Eye, EyeOff } from 'lucide-react'; 

interface SignupFormProps {
  onSubmit: (data: SignupSchema) => void;
  loading?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const handleGenderChange = (value: string) => {
    setValue('gender', value as 'male' | 'female', { shouldValidate: true });
  };
  
  const handleFormSubmit = (data: SignupSchema) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex flex-col gap-6 w-full max-w-md mx-auto text-gray-800')}>
      <h2 className="text-3xl font-bold text-center text-striv-primary">Create your account</h2>
      <p className="text-sm text-center text-striv-secondary mb-2">Start your personalized fitness and wellness journey ✨</p>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" type="text" {...register('first_name')} placeholder="John" />
          {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" type="text" {...register('last_name')} placeholder="Doe" />
          {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="••••••••" className="pr-10" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-striv-primary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 relative">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <div className="relative">
            <Input id="confirm_password" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" {...register('confirm_password')} className="pr-10" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-striv-primary transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirm_password && <p className="text-sm text-red-500">{errors.confirm_password.message}</p>}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={handleGenderChange}>
            <SelectTrigger className="w-full h-11 text-base border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40 bg-white/60 backdrop-blur-sm rounded-md px-3">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="z-[100] bg-white/95 border border-striv-muted/60 shadow-lg rounded-md" position="popper" sideOffset={6}>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              {/* <SelectItem value="other">Other</SelectItem> */}
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
        </div>

        {/* Age */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" {...register('age', { valueAsNumber: true })} placeholder="25" />
          {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
        </div>
      </div>

      {/* Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-gradient-to-r from-striv-primary to-striv-accent text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>

      {/* Google Signup Button */}
      <button
        type="button"
        onClick={() => console.log('Google Login Clicked!')}
        className="w-full h-11 mt-2 flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
        Sign up with Google
      </button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <a href="/signin" className="text-striv-primary font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

export default SignupForm;