import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-gray-900 bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-blue-500 px-3 py-2 text-sm font-semibold";
  const inactiveClass = "text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";
  const getNavLinkClass = ({ isActive }) => (isActive ? activeClass : inactiveClass);

  const mobileActiveClass = "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 text-gray-900 block px-3 py-2 text-base font-semibold";
  const mobileInactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-lg text-base font-medium transition-colors";
  const getMobileNavLinkClass = ({ isActive }) => (isActive ? mobileActiveClass : mobileInactiveClass);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
              onClick={closeMenu}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Templates Store
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-auto sm:flex sm:items-center sm:space-x-1">
            <NavLink to="/templates" className={getNavLinkClass}>
              Browse Templates
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/favorites" className={getNavLinkClass}>
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />
                  Favorites
                </div>
              </NavLink>
            )}
          </div>

          <div className="hidden sm:ml-4 sm:flex sm:items-center sm:space-x-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            {isAuthenticated && (
              <NavLink 
                to="/favorites" 
                className="p-2 text-gray-600 hover:text-gray-900 mr-1"
                onClick={closeMenu}
              >
                <HeartIcon className="w-5 h-5" />
              </NavLink>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200" id="mobile-menu">
          <div className="space-y-1 px-4 pt-2 pb-3">
            <NavLink 
              to="/templates" 
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Browse Templates
            </NavLink>
            {isAuthenticated && (
              <NavLink 
                to="/favorites" 
                className={getMobileNavLinkClass}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-5 h-5" />
                  My Favorites
                </div>
              </NavLink>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-4 pb-3">
            {isAuthenticated ? (
              <div className="px-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-base font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 px-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block w-full text-left text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block w-full text-left bg-gradient-to-r from-gray-900 to-gray-700 text-white px-3 py-2 rounded-lg text-base font-semibold text-center shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}