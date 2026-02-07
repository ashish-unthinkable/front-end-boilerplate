import { useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials, finishInitialCheck } from '@/features/auth/authSlice'
import { useGetProfileQuery } from '@/services/userApi'
import { useAuth } from '@/hooks/useAuth'

export const AppLayout = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user: authUser, isInitializing } = useAuth()
  const { data: profileUser, isSuccess, isError, isLoading } = useGetProfileQuery(undefined, {
    skip: isAuthenticated || !isInitializing,
  })

  useEffect(() => {
    if (isSuccess && profileUser) {
      dispatch(setCredentials({ user: profileUser, token: null }))
    } else if (isError) {
      dispatch(finishInitialCheck())
    } else if (!isLoading && !isAuthenticated && !isInitializing) {
      // Small safeguard: if we are not initializing and not auth, ensure state is sane
      dispatch(finishInitialCheck())
    }
  }, [isSuccess, isError, isLoading, profileUser, dispatch, isAuthenticated, isInitializing])

  const currentUser = useMemo(() => authUser || profileUser, [authUser, profileUser])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Frontend Boilerplate</h1>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser?.email}
              </span>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
