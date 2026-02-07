import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useAuth = () => {
  const { user, token, isAuthenticated, isInitializing } = useSelector(
    (state: RootState) => state.auth
  )

  return useMemo(
    () => ({ user, token, isAuthenticated, isInitializing }),
    [user, token, isAuthenticated, isInitializing]
  )
}
