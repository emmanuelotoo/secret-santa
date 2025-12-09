import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Match from './pages/Match'

function Nav() {
  const location = useLocation()
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/register', label: 'Register' },
    { to: '/match', label: 'Your match' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-slate-900">
          Secret Santa
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-1 rounded-lg hover:text-indigo-700 ${
                location.pathname === item.to ? 'text-indigo-700 bg-indigo-50' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function App() {
  return (
    <div className="min-h-screen text-slate-900">
      <Nav />
      <main className="max-w-5xl mx-auto pb-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/match" element={<Match />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
