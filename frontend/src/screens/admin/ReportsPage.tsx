import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Sidebar from '../../components/admin/Sidebar';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  TicketIcon,
} from '@heroicons/react/outline';

interface ReportStats {
  totalRevenue: number;
  totalTickets: number;
  totalUsers: number;
  totalTours: number;
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
  ticketsByMonth: {
    month: string;
    count: number;
  }[];
}

const ReportsPage: React.FC = () => {
  const [stats, setStats] = useState<ReportStats>({
    totalRevenue: 0,
    totalTickets: 0,
    totalUsers: 0,
    totalTours: 0,
    revenueByMonth: [],
    ticketsByMonth: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReportStats();
  }, []);

  const fetchReportStats = async () => {
    try {
      // Toplam gelir
      const { data: tickets } = await supabase
        .from('tickets')
        .select('total_price');

      const totalRevenue = tickets?.reduce((sum, ticket) => sum + ticket.total_price, 0) || 0;

      // Toplam bilet sayısı
      const { count: totalTickets } = await supabase
        .from('tickets')
        .select('*', { count: 'exact' });

      // Toplam kullanıcı sayısı
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact' });

      // Toplam tur sayısı
      const { count: totalTours } = await supabase
        .from('tours')
        .select('*', { count: 'exact' });

      // Aylık gelir
      const { data: monthlyTickets } = await supabase
        .from('tickets')
        .select('total_price, created_at');

      const revenueByMonth = monthlyTickets?.reduce((acc: any[], ticket) => {
        const month = new Date(ticket.created_at).toLocaleString('tr-TR', { month: 'long' });
        const existingMonth = acc.find(m => m.month === month);
        
        if (existingMonth) {
          existingMonth.revenue += ticket.total_price;
        } else {
          acc.push({ month, revenue: ticket.total_price });
        }
        
        return acc;
      }, []) || [];

      // Aylık bilet sayısı
      const ticketsByMonth = monthlyTickets?.reduce((acc: any[], ticket) => {
        const month = new Date(ticket.created_at).toLocaleString('tr-TR', { month: 'long' });
        const existingMonth = acc.find(m => m.month === month);
        
        if (existingMonth) {
          existingMonth.count += 1;
        } else {
          acc.push({ month, count: 1 });
        }
        
        return acc;
      }, []) || [];

      setStats({
        totalRevenue,
        totalTickets: totalTickets || 0,
        totalUsers: totalUsers || 0,
        totalTours: totalTours || 0,
        revenueByMonth,
        ticketsByMonth,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Raporlar</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Sistem istatistikleri ve raporları
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Genel İstatistikler */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Toplam Gelir</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {new Intl.NumberFormat('tr-TR', {
                              style: 'currency',
                              currency: 'TRY',
                            }).format(stats.totalRevenue)}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <TicketIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Toplam Bilet</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.totalTickets}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Toplam Kullanıcı</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Toplam Tur</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.totalTours}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aylık Grafikler */}
              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Aylık Gelir Grafiği */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">Aylık Gelir</h3>
                    <div className="mt-4">
                      <div className="space-y-4">
                        {stats.revenueByMonth.map((item) => (
                          <div key={item.month} className="flex items-center">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{item.month}</div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm text-gray-900">
                                {new Intl.NumberFormat('tr-TR', {
                                  style: 'currency',
                                  currency: 'TRY',
                                }).format(item.revenue)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aylık Bilet Sayısı Grafiği */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">Aylık Bilet Sayısı</h3>
                    <div className="mt-4">
                      <div className="space-y-4">
                        {stats.ticketsByMonth.map((item) => (
                          <div key={item.month} className="flex items-center">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{item.month}</div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm text-gray-900">{item.count}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage; 