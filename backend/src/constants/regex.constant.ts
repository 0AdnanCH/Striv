// Name should start with a letter and can contain letters, numbers, _ and -
export const NAME_REGEX = /^[A-Za-z][A-Za-z0-9_-]*$/;

// Password must:
// - Have no spaces
// - Contain at least 1 lowercase letter
// - Contain at least 1 uppercase letter
// - Contain at least 1 number
// - Contain at least 1 special character
// - Be at least 8 characters long
export const PASSWORD_REGEX = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}\[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}\[\]~]{8,}$/;

//Only accepts digits
export const PHONE_NO_REGEX = /^[0-9]{10}$/;

export const TIME_24H_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const OTP_REGEX = /^\d{6}$/;