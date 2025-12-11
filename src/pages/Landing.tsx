import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowRight, Gift, Clock, Zap, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { fetchParticipants } from '../api'

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}+</span>
}

export default function Landing() {
  const [participantCount, setParticipantCount] = useState(120)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const loadCount = async () => {
      const result = await fetchParticipants()
      if (result.success && result.data) {
        setParticipantCount(result.data.length || 120)
      }
    }
    loadCount()
    setIsVisible(true)
    
    // Refresh count every 30 seconds
    const interval = setInterval(loadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative bg-church-bg">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(199, 158, 76, 0.12) 0%, transparent 60%), radial-gradient(ellipse 100% 60% at 50% 100%, rgba(199, 158, 76, 0.08) 0%, transparent 60%), linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 50%, #FAFAF9 100%)",
          }}
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-church-gold/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-church-gold/6 rounded-full blur-3xl animate-float delay-200" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-church-gold/4 rounded-full blur-3xl animate-float delay-400" style={{ animationDelay: '4s' }} />
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-church-gold/10 rounded-full animate-pulse-glow" />
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-church-gold/10 rotate-45 animate-pulse-glow delay-300" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Hero Section - Centered Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Premium Top Navigation */}
        <div className="absolute top-0 right-0 p-6 lg:p-12 z-20 w-full flex justify-between lg:justify-end items-center">
          <span className="lg:hidden text-xs font-bold tracking-widest uppercase text-church-text">Grace Community</span>
          <Link 
            to="/admin/login" 
            className="text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-church-text transition-all duration-300 relative group px-4 py-2 -mr-4"
          >
            Admin Login
            <span className="absolute bottom-1 left-4 w-0 h-[1px] bg-church-gold group-hover:w-[calc(100%-2rem)] transition-all duration-500"></span>
          </Link>
        </div>

        {/* Main Content Area - Centered */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 lg:pt-0 pb-12">
          <div className="max-w-4xl w-full space-y-12 lg:space-y-16">
            
            {/* Premium Header Group - Centered */}
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4 animate-reveal-up">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-church-gold to-church-gold"></div>
                <span className="text-xs font-bold text-church-gold tracking-[0.3em] uppercase">
                  Est. 2025 • Grace Community
                </span>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-church-gold to-church-gold"></div>
              </div>
              
              {/* Large Icon/Emblem */}
              <div className="flex justify-center animate-reveal-up delay-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-church-gold/20 rounded-full blur-2xl animate-pulse-glow"></div>
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 border-2 border-church-gold/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/40 shadow-2xl">
                    <Gift className="w-12 h-12 lg:w-16 lg:h-16 text-church-gold" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif text-church-text tracking-tight leading-[0.9] animate-reveal-up delay-200">
                Secret <br/>
                <span className="italic font-light text-gray-500 relative inline-block">
                  Santa
                  <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-church-gold/60 to-transparent"></span>
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto animate-reveal-up delay-300">
                A tradition of connection. Join us in celebrating the season through the simple, profound act of giving.
              </p>
            </div>

            {/* Premium Action Area - Centered */}
            <div className="flex flex-col items-center gap-6 animate-reveal-up delay-400">
              <Link to="/join" className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-church-gold/30 via-church-gold/20 to-church-gold/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Button 
                  size="lg" 
                  className="relative rounded-full px-10 lg:px-12 h-16 lg:h-20 text-lg bg-church-text hover:bg-black text-white shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-500 group"
                >
                  Join the Exchange
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <div className="text-sm text-gray-500 font-medium tracking-wide flex items-center gap-2 group">
                <Clock className="w-4 h-4 group-hover:text-church-gold transition-colors" />
                Registration closes <span className="text-church-text font-semibold border-b border-church-gold/50 pb-0.5 hover:border-church-gold transition-colors">Dec 14</span>
              </div>
            </div>


          </div>
        </div>

        {/* Premium Footer / Stats Row - Centered */}
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24 pb-12 lg:pb-16 animate-reveal-up delay-700">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8 lg:gap-16 border-t border-church-border pt-12">
              {[
                { label: "Participants", value: participantCount, icon: TrendingUp },
                { label: "Matching", value: "Dec 14", icon: Zap },
                { label: "Exchange", value: "Dec 24", icon: Gift },
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-default text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <stat.icon className="w-4 h-4 text-gray-400 group-hover:text-church-gold transition-colors" />
                    <span className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase group-hover:text-church-gold transition-colors">{stat.label}</span>
                  </div>
                  <span className="text-3xl lg:text-4xl font-serif text-church-text group-hover:text-church-gold transition-colors inline-block">
                    {typeof stat.value === 'number' ? (
                      isVisible ? <AnimatedCounter end={stat.value} /> : stat.value
                    ) : (
                      stat.value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
