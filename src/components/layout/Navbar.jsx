import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-softGray">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">نور · Noor</Link>
        <div className="space-x-6">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary font-medium' : 'text-gray-600'}>হোম</NavLink>
          <NavLink to="/search" className={({isActive}) => isActive ? 'text-primary font-medium' : 'text-gray-600'}>অনুসন্ধান</NavLink>
          <NavLink to="/bookmarks" className={({isActive}) => isActive ? 'text-primary font-medium' : 'text-gray-600'}>বুকমার্ক</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar