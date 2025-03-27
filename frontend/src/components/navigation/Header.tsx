import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  onOpenMenu: () => void;
  isAuthenticated?: boolean;
  userEmail?: string;
  userRole?: string | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  isAuthenticated = false,
  userEmail = '',
  userRole = null,
  onLogout = () => {},
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={onOpenMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-brand-500">
            Daily Tour Ticket
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/tours"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {t('nav.tours')}
          </Link>
          <Link
            to="/reservations"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {t('nav.reservations')}
          </Link>
          <Link
            to="/tickets"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {t('nav.tickets')}
          </Link>
        </nav>

        {/* Right side - Auth + Language */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={toggleMenu}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('nav.profile')}
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('nav.settings')}
                  </Link>
                  {userRole === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('nav.admin')}
                    </Link>
                  )}
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('common.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                {t('common.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary hidden md:flex"
              >
                {t('common.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 