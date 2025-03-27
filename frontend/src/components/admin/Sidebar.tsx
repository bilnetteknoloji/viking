import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  TicketIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Kullanıcılar', href: '/admin/users', icon: UsersIcon },
  { name: 'Turlar', href: '/admin/tours', icon: CalendarIcon },
  { name: 'Biletler', href: '/admin/tickets', icon: TicketIcon },
  { name: 'Ödemeler', href: '/admin/payments', icon: CurrencyDollarIcon },
  { name: 'Raporlar', href: '/admin/reports', icon: ChartBarIcon },
  { name: 'Ayarlar', href: '/admin/settings', icon: CogIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Çıkış işlemleri burada yapılacak
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Daily Tour Ticket"
            />
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="flex-shrink-0 w-full group block"
          >
            <div className="flex items-center">
              <div>
                <LogoutIcon className="inline-block h-9 w-9 rounded-full text-gray-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Çıkış Yap</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 