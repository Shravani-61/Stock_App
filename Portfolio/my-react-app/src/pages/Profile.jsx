import { useAuth } from '../state/AuthContext.jsx'
import { decodeJWT } from '../utils/jwt.js'

export default function Profile() {
  const { token } = useAuth()
  const profile = token ? decodeJWT(token) : null

  return (
    <main className="container-page py-6">
      <div className="max-w-lg card-padded">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="mt-4 flex items-center gap-3">
          {profile?.picture && <img src={profile.picture} alt="avatar" className="h-12 w-12 rounded-full" />}
          <div>
            <div className="font-semibold text-slate-900">{profile?.name || 'User'}</div>
            <div className="subtitle">{profile?.email}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
