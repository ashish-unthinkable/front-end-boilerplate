import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/constants/routes'

export const PublicRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
