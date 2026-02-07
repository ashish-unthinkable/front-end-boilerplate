import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout as logoutAction } from '@/features/auth/authSlice'
import { useGetProfileQuery } from '@/services/userApi'
import { useLogoutMutation } from '@/services/authApi'
import { baseApi } from '@/services/baseApi'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/constants/routes'

export const Dashboard = () => {
  const { isAuthenticated } = useAuth()
  const { data: user, isLoading, error } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  })
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (err) {
      // Even if API fails, we clear local state
    } finally {
      dispatch(logoutAction())
      dispatch(baseApi.util.resetApiState())
      navigate(APP_ROUTES.LOGIN, { replace: true })
    }
  }

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>
  
  if (error) return (
    <div className="p-8 text-center text-red-500">
      Error loading profile. Please try logging in again.
    </div>
  )

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-md transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold">{user?.email}</span>!
          </p>
          <div className="p-4 bg-gray-50 rounded-md">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              User Profile Details
            </h2>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">User ID:</span>
              <span className="text-gray-800 font-mono">{user?._id}</span>
              
              <span className="text-gray-500">Email:</span>
              <span className="text-gray-800">{user?.email}</span>
              
              <span className="text-gray-500">Provider:</span>
              <span className="text-gray-800 capitalize">{user?.provider}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            This information is fetched directly from your backend session.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
