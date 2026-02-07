import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { auth } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Welcome Home</h2>
      <p className="text-gray-600">
        {auth.isAuthenticated
          ? `Logged in as ${auth.user?.name}`
          : 'Not logged in'}
      </p>
      <div className="flex gap-4">
        <Button variant="primary">Primary Action</Button>
        <Button variant="ghost">Secondary Action</Button>
      </div>
    </div>
  )
}
