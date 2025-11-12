import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../components/ui/Button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../../../../components/ui/InputOtp';

import { cn } from '../../../../utils/cn.util'; 
import { otpSchema, type OtpSchema } from '../../schemas';
import { useOtpCooldown } from '../../hooks/useOtpCooldown';
import { OTP_COOLDOWN_SECONDS, OTP_COOLDOWN_STORAGE_KEY } from '../../../../constants/otp.constants';

interface OtpFormProps {
  onSubmit: (otp: string) => void | Promise<void>;
  loading?: boolean;
  resendOtp?: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({
  onSubmit,
  loading,
  resendOtp,
}) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    mode: 'onBlur',
  });

  const { cooldown, isCooldownActive, startCooldown } = useOtpCooldown({
    duration: OTP_COOLDOWN_SECONDS,
    storageKey: OTP_COOLDOWN_STORAGE_KEY,
  });
  
  const otpValue = watch('otp', '');

  const handleFormSubmit = async (data: OtpSchema) => {
    await onSubmit(data.otp);
  };

  const handleOtpChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setValue('otp', value, { shouldValidate: true });
    }
  };

  const handleResend = async () => {
    if (!resendOtp || isCooldownActive) return;
    await resendOtp();
    startCooldown();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex flex-col gap-6 w-full max-w-sm mx-auto p-6 rounded-2xl shadow-md border border-striv-muted/30 bg-white/80 backdrop-blur-sm')}>
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-striv-primary">Enter OTP 🔐</h2>
      <p className="text-sm text-center text-gray-600">Please enter the 6-digit code sent to your email or phone</p>

      {/* OTP Input */}
      <div className="flex flex-col items-center gap-2">
        <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange} containerClassName="justify-center">
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={cn('text-lg font-semibold text-gray-800')}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {errors.otp && <p className="text-sm text-red-500 mt-1">{errors.otp.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-gradient-to-r from-striv-primary to-striv-accent text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>

      {/* Resend Button */}
      {resendOtp && (
        <div className="text-center text-sm mt-2">
          {isCooldownActive ? (
            <p className="text-gray-500">
              Resend available in <span className="font-semibold text-striv-primary">{cooldown}s</span>
            </p>
          ) : (
            <button type="button" onClick={handleResend} className="text-striv-primary font-semibold hover:underline transition-colors">
              Didn’t receive OTP? Resend
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default OtpForm;
