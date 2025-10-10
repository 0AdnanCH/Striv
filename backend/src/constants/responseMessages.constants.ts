export const RESPONSE_MESSAGES = {
  REGISTER_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  USER_NOT_FOUND: 'No account found with this email address.',
  INCORRECT_PASSWORD: 'Incorrect password. Please try again.',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_ALREADY_VERIFIED: 'This account is already verified.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  OTP_SENT: 'OTP has been sent to your email.',
  OTP_NOT_FOUND: 'OTP not found. Please request a new one.',
  OTP_EXPIRED: 'OTP expired. Please request a new one.',
  OTP_RESENT: 'A new OTP has been sent to your email address.',
  OTP_VERIFIED: 'Email verified successfully.',
  INVALID_OTP: 'Invalid OTP. Please try again.',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in.'
} as const;