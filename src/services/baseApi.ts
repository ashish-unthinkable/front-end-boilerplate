import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logout, setCredentials } from '@/features/auth/authSlice'
import { API_ENDPOINTS } from '@/constants/api'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include',
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // avoid re-auth for auth endpoints or if token is not there
    const url = typeof args === 'string' ? args : args.url
    const isAuthPath = url.includes('auth/')
    
    if (!isAuthPath) {
      // try to get a new token
      const refreshResult = await baseQuery(
        { url: API_ENDPOINTS.AUTH.REFRESH_TOKEN, method: 'POST' },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        // store the new token
        api.dispatch(setCredentials(refreshResult.data as any))
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logout())
      }
    } else if (url !== API_ENDPOINTS.AUTH.REFRESH_TOKEN) {
      // If it's a 401 on an auth path (other than refresh itself), just logout
      api.dispatch(logout())
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
})
