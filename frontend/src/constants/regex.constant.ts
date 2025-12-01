// Checks at least one uppercase A–Z
export const REGEX_UPPERCASE = /[A-Z]/;

// Checks at least one lowercase a–z
export const REGEX_LOWERCASE = /[a-z]/;

// Checks at least one number 0–9
export const REGEX_NUMBER = /[0-9]/;

// Checks at least one special character
export const REGEX_SPECIAL_CHAR = /[^A-Za-z0-9]/;

// Checks no white space 
export const REGEX_NO_WHITESPACE = /^(?!.*\s).*$/;

export const NAME_REGEX = /^[A-Za-z][A-Za-z0-9_-]*$/;

export const OTP_REGEX = /^\d{6}$/;

export const TIME_24H_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const URL_REGEX = /^https?:\/\/.+/;