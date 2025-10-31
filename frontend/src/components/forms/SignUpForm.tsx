import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import type { SignUpData } from '../../types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '../ui/Select';
import { Eye, EyeOff } from 'lucide-react'; 

interface SignUpFormProps {
  onSubmit: (data: SignUpData) => void;
  loading?: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '', 
    password: '',
    confirm_password: '',
    gender: '',
    age: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      ...formData,
      age: Number(formData.age),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6 w-full max-w-md mx-auto text-gray-800')}>
      <h2 className="text-3xl font-bold text-center text-striv-primary">Create your account</h2>
      <p className="text-sm text-center text-striv-secondary mb-2">Start your personalized fitness and wellness journey ✨</p>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" name="first_name" type="text" placeholder="John" value={formData.first_name} onChange={handleChange} required />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" name="last_name" type="text" placeholder="Doe" value={formData.last_name} onChange={handleChange} required />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.password} onChange={handleChange} required className="pr-10" />
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 relative">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm_password"
              name="confirm_password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-striv-primary transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={handleGenderChange}>
            <SelectTrigger className="w-full h-11 text-base border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40 bg-white/60 backdrop-blur-sm rounded-md px-3">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="z-[100] bg-white/95 border border-striv-muted/60 shadow-lg rounded-md" position="popper" sideOffset={6}>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" placeholder="25" value={formData.age} onChange={handleChange} required min={10} max={100} />
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

      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <a href="/signin" className="text-striv-primary font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

export default SignUpForm;