import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextType {
  isAdminAuthenticated: boolean
  isMemberAuthenticated: boolean
  loginAdmin: (username: string, password: string) => boolean
  loginMember: (accessCode: string) => boolean
  logoutAdmin: () => void
  logoutMember: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Admin credentials from environment variables
const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || '',
  password: import.meta.env.VITE_ADMIN_PASSWORD || ''
}

// Member access code from environment variables
const MEMBER_ACCESS_CODE = import.meta.env.VITE_MEMBER_ACCESS_CODE || ''

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isMemberAuthenticated, setIsMemberAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user was previously authenticated
    const adminAuth = sessionStorage.getItem('adminAuth')
    const memberAuth = sessionStorage.getItem('memberAuth')
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true)
    }
    if (memberAuth === 'true') {
      setIsMemberAuthenticated(true)
    }
  }, [])

  const loginAdmin = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdminAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      return true
    }
    return false
  }

  const loginMember = (accessCode: string): boolean => {
    if (accessCode === MEMBER_ACCESS_CODE) {
      setIsMemberAuthenticated(true)
      sessionStorage.setItem('memberAuth', 'true')
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
  }

  const logoutMember = () => {
    setIsMemberAuthenticated(false)
    sessionStorage.removeItem('memberAuth')
  }

  return (
    <AuthContext.Provider value={{ 
      isAdminAuthenticated, 
      isMemberAuthenticated, 
      loginAdmin, 
      loginMember, 
      logoutAdmin, 
      logoutMember 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
