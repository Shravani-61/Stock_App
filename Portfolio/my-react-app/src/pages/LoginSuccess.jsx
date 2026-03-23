import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

// Reads JWT from the redirect URL and stores it, then redirects to /dashboard
export default function LoginSuccess() {
  const { setToken } = useAuth()
  const { search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const token = params.get('token')
    if (token) {
      setToken(token)
      // Redirect to portfolio after login (dashboard removed)
      navigate('/portfolio', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }, [search, setToken, navigate])

  return null
}
