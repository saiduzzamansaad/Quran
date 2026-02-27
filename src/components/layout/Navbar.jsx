import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Search, Bookmark, Home, Sparkles } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'হোম', icon: <Home size={18} /> },
    { path: '/search', label: 'অনুসন্ধান', icon: <Search size={18} /> },
    { path: '/bookmarks', label: 'বুকমার্ক', icon: <Bookmark size={18} /> },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="relative max-w-6xl mx-auto px-4">
        
        {/* --- RUNNING BORDER ANIMATION --- */}
        <div className="absolute inset-0 rounded-[2.5rem] p-[2px] overflow-hidden">
          <div className="absolute inset-[-1000%] animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,#transparent_0%,#3B82F6_25%,#8B5CF6_50%,#3B82F6_75%,#transparent_100%)]" />
        </div>

        {/* --- MAIN GLASS BODY --- */}
        <div className="relative bg-white/90 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.4rem] border border-white/60">
          <div className="px-8 py-4 flex items-center justify-between">
            
            {/* AI LOGO WITH GLOW */}
            <Link to="/" className="flex items-center gap-2 group relative z-10">
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500 animate-pulse-slow"></div>
                
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 leading-none tracking-tight">
                  নুর <span className="text-primary">·</span> Noor
                </span>
                
              </div>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className={({ isActive }) => `
                    relative px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-500
                    ${isActive ? 'text-white' : 'text-gray-600 hover:text-primary hover:bg-white/50'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-lg shadow-primary/30 z-0" />
                      )}
                      <span className="relative z-10">{link.icon}</span>
                      <span className="relative z-10 font-bold text-sm">{link.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* MOBILE TOGGLE & ACTION */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-primary hover:shadow-xl hover:shadow-primary/40 transition-all active:scale-95">
                শুরু করুন
              </button>

              <button 
                className="md:hidden p-3 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* --- MOBILE MENU (Advanced Slide) --- */}
          <div className={`md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 pb-8 pt-4 space-y-3">
              {navLinks.map((link, i) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className={({ isActive }) => `
                    flex items-center justify-between p-4 rounded-2xl transition-all border
                    ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-transparent shadow-xl shadow-primary/20' 
                      : 'bg-white text-gray-600 border-gray-100 hover:border-primary/30'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={({ isActive }) => isActive ? 'text-white' : 'text-primary'}>{link.icon}</span>
                    <span className="font-bold">{link.label}</span>
                  </div>
                  {({ isActive }) => (
                    <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-gray-200'}`} />
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar