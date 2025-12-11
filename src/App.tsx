import { Link, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Match from './pages/Match'
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return <>{children}</>
}

function Nav() {
  const location = useLocation()
  const navItems = [
    { to: '/', label: 'Overview' },
    { to: '/register', label: 'Register' },
    { to: '/match', label: 'My Match' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                S
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                Secret Santa
              </span>
            </Link>
            <nav className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-indigo-500 text-slate-900'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/register"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function AppContent() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/' || location.pathname === '/admin/login'

  return (
    <div className="min-h-screen text-slate-900">
      {!isLandingPage && <Nav />}
      <main className={isLandingPage ? "" : "max-w-5xl mx-auto pb-16"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/match" element={<Match />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
