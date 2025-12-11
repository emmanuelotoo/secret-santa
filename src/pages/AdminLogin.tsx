import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Link } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(username, password)
    
    if (success) {
      navigate('/admin')
    } else {
      setError('Invalid username or password')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative bg-church-bg">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(199, 158, 76, 0.12) 0%, transparent 60%), radial-gradient(ellipse 100% 60% at 50% 100%, rgba(199, 158, 76, 0.08) 0%, transparent 60%), linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 50%, #FAFAF9 100%)",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-church-gold/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-church-gold/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Back to Home */}
      <div className="relative z-10 p-6 lg:p-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-church-text transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md animate-reveal-up">
          <Card className="border-church-border/40 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-2">
              <div className="mx-auto w-16 h-16 bg-church-gold/10 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-church-gold" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-church-text">Admin Access</CardTitle>
                <CardDescription className="mt-2">
                  Enter your credentials to access the admin panel
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg animate-reveal-up">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    autoComplete="username"
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    autoComplete="current-password"
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-full bg-church-text hover:bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-church-border/40 text-center">
                <p className="text-xs text-gray-400">
                  Contact your administrator if you need access credentials
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
