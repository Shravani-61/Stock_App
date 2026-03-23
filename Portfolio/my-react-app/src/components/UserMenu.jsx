import { NavLink } from 'react-router-dom'

export default function UserMenu({ profile, onLogout }) {
  return (
    <details className="relative">
      <summary className="list-none flex items-center gap-2 cursor-pointer select-none">
        {profile?.picture && <img src={profile.picture} alt="avatar" className="h-7 w-7 rounded-full" />}
        <span className="text-sm font-bold dark:text-white text-slate-800">{profile?.name || 'User'}</span>
      </summary>
      <div className="absolute right-0 mt-2 w-56 card overflow-hidden">
        <div className="p-2">
          <NavLink to="/profile" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm">Profile</NavLink>
          <NavLink to="/portfolio" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm">Portfolio</NavLink>
          <NavLink to="/profit-loss" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm">Profit / Loss</NavLink>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm text-rose-600" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </details>
  )
}
