import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

// Protects nested routes; redirects unauthenticated users to /login
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
