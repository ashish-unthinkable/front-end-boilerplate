import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, LoginResponse } from './authTypes'

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitializing: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<LoginResponse>
    ) => {
      state.user = user
      state.token = token
      state.isAuthenticated = true
      state.isInitializing = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isInitializing = false
    },
    finishInitialCheck: (state) => {
      state.isInitializing = false
    },
  },
})

export const { setCredentials, logout, finishInitialCheck } = authSlice.actions
export default authSlice.reducer
