import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg 
            className="h-8 w-8 text-brand-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" 
            />
          </svg>
          <h1 className="text-2xl font-bold text-brand-600">Günübirlik Tekne Turu</h1>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-brand-500 transition-colors font-medium">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/turlar" className="text-gray-600 hover:text-brand-500 transition-colors font-medium">
                Turlar
              </Link>
            </li>
            <li>
              <Link to="/rezervasyon" className="text-gray-600 hover:text-brand-500 transition-colors font-medium">
                Rezervasyon
              </Link>
            </li>
            <li>
              <Link to="/iletisim" className="text-gray-600 hover:text-brand-500 transition-colors font-medium">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors hidden md:block">
            Şimdi Rezervasyon Yap
          </button>
          
          <button className="md:hidden text-gray-600">
            <svg 
              className="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
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
        </div>
      </div>
    </header>
  );
};

export default Header; 