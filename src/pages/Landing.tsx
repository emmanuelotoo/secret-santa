import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import heroImage from '../assets/vitaly-gariev-0X3416CNi4c-unsplash.jpg'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
        }}
      />

      {/* Left Side - Cinematic Image */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/10 z-10 mix-blend-multiply" /> 
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
        <img 
          src={heroImage} 
          alt="Christmas Gift Exchange" 
          className="w-full h-full object-cover scale-105 animate-reveal-up duration-[2000ms] grayscale-[10%] sepia-[10%] contrast-[1.05]"
        />
      </div>

      {/* Right Side - Editorial Content */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Top Navigation - Minimal */}
        <div className="absolute top-0 right-0 p-8 lg:p-12 z-20 w-full flex justify-between lg:justify-end items-center">
           <span className="lg:hidden text-xs font-bold tracking-widest uppercase text-black">Grace Community</span>

           <Link to="/admin" className="text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-church-text transition-colors">
             Admin Login
           </Link>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 pt-20 lg:pt-0">
          <div className="max-w-xl w-full space-y-10">
            
            {/* Header Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-reveal-up">
                <div className="h-[1px] w-12 bg-church-gold"></div>
                <span className="text-xs font-bold text-church-gold tracking-[0.3em] uppercase">
                  Est. 2025 • Grace Community
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-serif text-church-text tracking-tight leading-[0.9] animate-reveal-up delay-100">
                Secret <br/>
                <span className="italic font-light text-gray-400">Santa</span>
              </h1>
              
              <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed max-w-md animate-reveal-up delay-200">
                A tradition of connection. Join us in celebrating the season through the simple, profound act of giving.
              </p>
            </div>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center animate-reveal-up delay-300">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-10 h-16 text-base bg-church-text hover:bg-black text-white shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-500 group">
                  Join the Exchange
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="text-xs text-gray-400 font-medium tracking-wide">
                Registration closes <span className="text-church-text border-b border-church-gold/50 pb-0.5">Dec 15</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer / Data Row */}
        <div className="px-8 lg:px-24 xl:px-32 pb-12 lg:pb-16 animate-reveal-up delay-300">
          <div className="grid grid-cols-3 gap-12 border-t border-church-border pt-8">
            <div>
              <span className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Participants</span>
              <span className="text-2xl font-serif text-church-text">120+</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Matching</span>
              <span className="text-2xl font-serif text-church-text">Dec 16</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Exchange</span>
              <span className="text-2xl font-serif text-church-text">Dec 24</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
