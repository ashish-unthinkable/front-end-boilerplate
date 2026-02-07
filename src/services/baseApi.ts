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
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

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
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const url = typeof args === 'string' ? args : args.url
    const isAuthPath = url?.includes('auth/')

    // 1. Guard against infinite loops: don't refresh if it's already an auth path
    if (isAuthPath) {
      if (url !== API_ENDPOINTS.AUTH.REFRESH_TOKEN) {
        api.dispatch(logout())
      }
      return result
    }

    // 2. Concurrency handling: use a mutex to ensure only one refresh in flight
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          { url: API_ENDPOINTS.AUTH.REFRESH_TOKEN, method: 'POST' },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          api.dispatch(setCredentials(refreshResult.data as any))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        release()
      }
    } else {
      // wait until the mutex is available and then retry the original query
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
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
