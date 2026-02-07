import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { APP_ROUTES } from '@/constants/routes'

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: APP_ROUTES.LOGIN.substring(1), // Remove leading slash for child route
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
])
