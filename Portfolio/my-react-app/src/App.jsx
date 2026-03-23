import { Route, Routes } from 'react-router-dom'
import './App.css'

import Login from './pages/Login.jsx'
import LoginSuccess from './pages/LoginSuccess.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Portfolio from './pages/Portfolio.jsx'
import ProfitLoss from './pages/ProfitLoss.jsx'
import PaperTrading from './pages/PaperTrading.jsx'
import { useAuth } from './state/AuthContext.jsx'
import { decodeJWT } from './utils/jwt.js'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'
import LearnMore from './pages/LearnMore.jsx'
import Home from './pages/Home.jsx'

function App() {
  const { token, setToken, isAuthenticated } = useAuth()
  const profile = token ? decodeJWT(token) : null

  const logout = () => setToken(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} profile={profile} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/paper-trading" element={<PaperTrading />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
