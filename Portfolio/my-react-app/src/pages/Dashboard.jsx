import { useAuth } from '../state/AuthContext.jsx'
import { decodeJWT } from '../utils/jwt.js'

export default function Dashboard() {
  const { token } = useAuth()
  const profile = token ? decodeJWT(token) : null

  return (
    <main className="container-page py-6 grid gap-6 md:grid-cols-3">
      <div className="card-padded md:col-span-2">
        <h1 className="text-2xl font-bold">Welcome{profile?.name ? `, ${profile.name}` : ''}</h1>
        <p className="subtitle mt-1">You are authenticated. Your token is stored securely and used for API calls.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="card-padded">
            <div className="subtitle">Quick Stat</div>
            <div className="text-xl font-semibold">Portfolio coming soon</div>
          </div>
          <div className="card-padded">
            <div className="subtitle">Quick Stat</div>
            <div className="text-xl font-semibold">Profit/Loss coming soon</div>
          </div>
        </div>
      </div>
      <div className="card-padded">
        <div className="subtitle">Account</div>
        <div className="mt-2 flex items-center gap-3">
          {profile?.picture && <img src={profile.picture} alt="avatar" className="h-10 w-10 rounded-full" />}
          <div>
            <div className="font-semibold">{profile?.name || 'User'}</div>
            <div className="subtitle">{profile?.email}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
