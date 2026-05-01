export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_REQUIRED: 'Authorization token is required',
    REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
    INVALID_TOKEN: 'Invalid or expired token',
    USER_NOT_FOUND: 'User no longer exists',
    USER_ALREADY_EXISTS: (email: string) => `User with email ${email} already exists.`,
  },
  VALIDATION: {
    DEFAULT: 'Validation Error',
  },
  SERVER: {
    INTERNAL_ERROR: 'Internal Server Error',
  }
};
