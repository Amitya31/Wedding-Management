import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-pink-200 to-pink-300 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-10 text-pink-600 p-2 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-gray-800">WedEase</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/venues" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Venues
            </Link>
            <Link to="/accessories-makeup" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Accessories & Makeup
            </Link>
            <Link to="/artists" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Artists
            </Link>
            <Link to="/decorators" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Decorators
            </Link>
            <Link to="/caterers" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Caterers
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Blogs
            </Link>
          </nav>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {user?.role === 'vendor' && (
                <Link 
                  to="/vendor" 
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className='bg-pink-500 hover:bg-pink-600 px-7 py-2 rounded-2xl text-white transition-colors'
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={'/login'} className='bg-pink-500 hover:bg-pink-600 px-7 py-2 rounded-2xl text-white transition-colors'>Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header