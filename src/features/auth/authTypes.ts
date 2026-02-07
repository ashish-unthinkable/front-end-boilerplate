import { User } from '@/types/user'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export type LoginResponse = {
  user: User
  token: string
}
