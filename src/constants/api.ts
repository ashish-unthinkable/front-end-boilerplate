export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    REFRESH_TOKEN: 'auth/refresh-token',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    LOGOUT: 'auth/logout',
    GOOGLE_LOGIN: 'auth/google',
    GOOGLE_CALLBACK: 'auth/google/callback',
  },
  USER: {
    PROFILE: 'user/',
  },
} as const;
