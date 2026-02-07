import { baseApi } from './baseApi'
import { API_ENDPOINTS } from '@/constants/api'
import { LoginResponse } from '@/features/auth/authTypes'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, any>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    verifyResetToken: builder.query<any, string>({
      query: (token) => `${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`,
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyResetTokenQuery,
  useLogoutMutation,
} = authApi
