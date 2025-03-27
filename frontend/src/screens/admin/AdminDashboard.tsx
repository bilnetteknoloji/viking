import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Sidebar from '../../components/admin/Sidebar';
import {
  UsersIcon,
  TicketIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline';

interface DashboardStats {
  totalUsers: number;
  totalTours: number;
  totalTickets: number;
  totalRevenue: number;
}

interface StatItem {
  name: string;
  stat: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTours: 0,
    totalTickets: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Kullanıcı sayısı
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact' });

      // Tur sayısı
      const { count: tourCount } = await supabase
        .from('tours')
        .select('*', { count: 'exact' });

      // Bilet sayısı
      const { count: ticketCount } = await supabase
        .from('tickets')
        .select('*', { count: 'exact' });

      // Toplam gelir
      const { data: tickets } = await supabase
        .from('tickets')
        .select('total_price');

      const totalRevenue = tickets?.reduce((sum, ticket) => sum + ticket.total_price, 0) || 0;

      setDashboardStats({
        totalUsers: userCount || 0,
        totalTours: tourCount || 0,
        totalTickets: ticketCount || 0,
        totalRevenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems: StatItem[] = [
    { name: 'Toplam Kullanıcı', stat: dashboardStats.totalUsers, icon: UsersIcon },
    { name: 'Toplam Tur', stat: dashboardStats.totalTours, icon: CalendarIcon },
    { name: 'Toplam Bilet', stat: dashboardStats.totalTickets, icon: TicketIcon },
    {
      name: 'Toplam Gelir',
      stat: `₺${dashboardStats.totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Genel Bakış
              </h2>

              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                  >
                    <dt>
                      <div className="absolute bg-indigo-500 rounded-md p-3">
                        <item.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">
                        {item.stat}
                      </p>
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Son Aktiviteler */}
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Son Aktiviteler
              </h2>
              {/* Aktivite listesi buraya eklenecek */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 