import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/features/auth/authSlice'
import { useLoginMutation } from '@/services/authApi'
import { APP_ROUTES } from '@/constants/routes'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const userData = await login({ email, password }).unwrap()
    dispatch(setCredentials(userData))
    navigate(APP_ROUTES.HOME, { replace: true })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="p-8 bg-white rounded-lg shadow-md border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />



          {error && (
            <p className="text-red-500 text-sm">
              {'data' in error ? (error.data as any).message : 'Login failed'}
            </p>
          )}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
