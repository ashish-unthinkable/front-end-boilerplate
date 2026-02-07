import { baseApi } from './baseApi'
import { User } from '@/types/user'
import { API_ENDPOINTS } from '@/constants/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => API_ENDPOINTS.USER.PROFILE,
      transformResponse: (response: { data: User }) => response.data,
      providesTags: ['User'],
    }),
  }),
})

export const { useGetProfileQuery } = userApi
