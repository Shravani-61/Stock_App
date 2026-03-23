import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../state/ThemeContext.jsx'
import UserMenu from './UserMenu.jsx'

export default function Navbar({ isAuthenticated, profile, onLogout }) {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-1 rounded-full text-sm font-medium transition-colors ${
      isActive ? 'bg-slate-100 text-sky-700 dark:bg-slate-800 dark:text-sky-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`

  return (
    <nav className="sticky top-0 z-20 backdrop-blur py-3">
      <div className="container-page">
        {/* Floating pill navbar container */}
        <div className="flex items-center justify-between rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm h-12 px-3 sm:px-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img className="h-10 w-10 rounded-full" src="../../public/logo.png" alt="Portfolio logo" />
            <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">StockX</span>
          </div>

          {/* Center: links in a rounded pill (desktop) */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 px-1 py-1">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            {isAuthenticated && (
              <NavLink to="/paper-trading" className={linkClass}>Paper Trading</NavLink>
            )}
            {!isAuthenticated && (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            )}
            <NavLink to="/learn-more" className={linkClass}>Learn More</NavLink>
          </div>

          {/* Right: CTA + theme toggle + user menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-ghost rounded-full"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <span className="text-lg" role="img" aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            {isAuthenticated ? (
              <>
                <NavLink to="/portfolio" className="btn btn-primary rounded-full px-4">Open Portfolio</NavLink>
                <UserMenu profile={profile} onLogout={onLogout} />
              </>
            ) : (
              <NavLink to="/login" className="btn btn-primary rounded-full px-4">Sign in</NavLink>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-full h-9 w-9 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu"
              onClick={() => setOpen(o => !o)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="mt-2 md:hidden rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm p-2">
            <div className="flex flex-col gap-1">
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
              {isAuthenticated && (
                <NavLink to="/paper-trading" className={linkClass} onClick={() => setOpen(false)}>Paper Trading</NavLink>
              )}
              {!isAuthenticated && (
                <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
              )}
              {isAuthenticated ? (
                <NavLink to="/portfolio" className={linkClass} onClick={() => setOpen(false)}>Open Portfolio</NavLink>
              ) : (
                <NavLink to="/learn-more" className={linkClass} onClick={() => setOpen(false)}>Learn More</NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
