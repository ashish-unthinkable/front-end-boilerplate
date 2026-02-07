import { User } from '@/types/user'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isInitializing: boolean
}

export type LoginResponse = {
  user: User
  token: string | null
}
