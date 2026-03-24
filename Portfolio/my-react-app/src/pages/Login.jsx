import { useEffect } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

// Minimal login page with a Google OAuth redirect button
export default function Login() {
  useEffect(() => {
    document.title = 'Login — Portfolio'
  }, [])

  const handleGoogleLogin = () => {
    // Redirect the browser to the backend OAuth endpoint
    window.location.href = `${BACKEND_URL}/auth/google`
  }

  return (
    <main className="container-page py-8">
      <div className="max-w-md mx-auto card-padded text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-slate-600 mt-1">Login to access your dashboard.</p>
        <button onClick={handleGoogleLogin} className="btn btn-primary w-full mt-4">
          Login with Google
        </button>
      </div>
    </main>
  )
}
