import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtpForm from "../../components/forms/OtpForm";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { handleApiError } from "../../utils/handleApiError.util";

const VerifySignUpOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifySignupOtp, resendOtp, loading } = useAuth();

  const emailFromState = (location.state as { email: string } | null)?.email;

  const email = useMemo(() => {
    return emailFromState ?? sessionStorage.getItem('signup_email') ?? null;
  }, [emailFromState]);

  useEffect(() => {
    if(!email) {
      navigate('/signup', { replace: true });
    }
  }, [email, navigate]);

  const handleOtpSubmit = async (otp: string) => {
    if(!email) {
      console.error('Email not found.');
      return;
    }

    try {
      const response = await verifySignupOtp({ email, otp });
      sessionStorage.removeItem('signup_email');
      toast.success(response.message);
      console.log('OTP verified successfully:', response);
      navigate('/');
    } catch (error: any) {
      handleApiError('VerifySignupOtp', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      if(!email) {
        console.error('Email not found for resend OTP');
        return;
      }
      const response = await resendOtp(email);
      toast.success(response.message);
      console.log('OTP resent:', response);
    } catch (error: any) {
      handleApiError('VerifySignUpOtp/resendOtp', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-striv-bg px-4">
      <OtpForm onSubmit={handleOtpSubmit} resendOtp={handleResendOtp} loading={loading} />
    </div>
  );
};

export default VerifySignUpOtpPage;