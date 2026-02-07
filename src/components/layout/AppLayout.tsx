import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials, finishInitialCheck } from '@/features/auth/authSlice'
import { useGetProfileQuery } from '@/services/userApi'
import { useAuth } from '@/hooks/useAuth'
import SideMenu from '@/components/SideMenu'

export const AppLayout = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, isInitializing } = useAuth()
  const { data: profileUser, isSuccess, isError, isLoading } = useGetProfileQuery(undefined, {
    skip: isAuthenticated || !isInitializing,
  })

  useEffect(() => {
    if (isSuccess && profileUser) {
      dispatch(setCredentials({ user: profileUser, token: null }))
    } else if (isError) {
      dispatch(finishInitialCheck())
    } else if (!isLoading && !isAuthenticated && !isInitializing) {
      dispatch(finishInitialCheck())
    }
  }, [isSuccess, isError, isLoading, profileUser, dispatch, isAuthenticated, isInitializing])

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isAuthenticated && <SideMenu />}
      <main 
        className="flex-1 transition-all duration-300 min-h-screen"
        style={{ paddingLeft: isAuthenticated ? 'var(--sidebar-width, 280px)' : '0' }}
      >
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

