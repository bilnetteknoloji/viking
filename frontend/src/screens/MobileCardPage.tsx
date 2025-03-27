import React from 'react';
import { Link } from 'react-router-dom';
import { TicketIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

// SVG İkonları
const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TripAdvisorIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.006 4.295c-4.327 0-7.829 3.516-7.829 7.858 0 4.342 3.502 7.858 7.829 7.858 4.327 0 7.83-3.516 7.83-7.858 0-4.342-3.502-7.858-7.83-7.858zm0 14.767c-3.784 0-6.877-3.106-6.877-6.909 0-3.803 3.093-6.909 6.877-6.909 3.784 0 6.878 3.106 6.878 6.909 0 3.803-3.094 6.909-6.878 6.909z" />
    <path d="M15.412 11.42c0 1.888-1.52 3.417-3.396 3.417-1.876 0-3.397-1.529-3.397-3.417s1.52-3.417 3.397-3.417c1.876 0 3.396 1.529 3.396 3.417zm-3.396-2.452c-1.349 0-2.443 1.099-2.443 2.452 0 1.353 1.094 2.452 2.443 2.452 1.349 0 2.442-1.099 2.442-2.452 0-1.353-1.093-2.452-2.442-2.452zM8.704 11.42c0 1.715-1.377 3.107-3.073 3.107S2.558 13.135 2.558 11.42s1.376-3.107 3.073-3.107 3.073 1.392 3.073 3.107zm-3.073-2.142c-1.178 0-2.132.961-2.132 2.142 0 1.181.954 2.142 2.132 2.142 1.178 0 2.132-.961 2.132-2.142 0-1.181-.954-2.142-2.132-2.142zM21.442 11.42c0 1.715-1.376 3.107-3.073 3.107-1.696 0-3.073-1.392-3.073-3.107s1.377-3.107 3.073-3.107c1.697 0 3.073 1.392 3.073 3.107zm-3.073-2.142c-1.178 0-2.132.961-2.132 2.142 0 1.181.954 2.142 2.132 2.142 1.178 0 2.132-.961 2.132-2.142 0-1.181-.954-2.142-2.132-2.142z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const GoogleReviewIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const BoatIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15L13 4l3.5 3.5L8 17"></path>
    <path d="M18 17l-3 4-8.5-8.5"></path>
  </svg>
);

const FoodIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 2v4h10V2"></path>
    <path d="M1 6h22v4H1z"></path>
    <path d="M4 10v10a2 2 0 002 2h12a2 2 0 002-2V10"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
  </svg>
);

const WebIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
  </svg>
);

const MobileCardPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bölümü */}
      <div className="bg-white shadow-sm px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-full p-2 shadow-sm ring-2 ring-blue-50">
            <img
              src="/assets/logo.jpg" 
              alt={t('header.title')} 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <h1 className="text-xl font-bold text-gray-800">{t('header.title')}</h1>
          <p className="text-sm text-gray-500">{t('header.subtitle')}</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Turlar Bölümü */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">{t('sections.tours.title')}</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link to="/tur-bilgisi" className="block">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <InfoIcon />
                </div>
                <h3 className="font-medium text-gray-800 text-sm">{t('sections.tours.tourInfo.title')}</h3>
                <p className="text-xs text-gray-500 mt-1">{t('sections.tours.tourInfo.description')}</p>
              </div>
            </Link>

            <a href="https://oludenizholiday.com" target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 mb-2">
                  <BoatIcon />
                </div>
                <h3 className="font-medium text-gray-800 text-sm">{t('sections.tours.otherTours.title')}</h3>
                <p className="text-xs text-gray-500 mt-1">{t('sections.tours.otherTours.description')}</p>
              </div>
            </a>

            <Link to="/reservations/create" className="block">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white mb-2">
                  <TicketIcon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-white text-sm">{t('sections.tours.reservation.title')}</h3>
                <p className="text-xs text-white/80 mt-1">{t('sections.tours.reservation.description')}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Menü Kartı */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">{t('sections.menu.title')}</h2>
          <Link to="/menu" className="block">
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <FoodIcon />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-gray-800">{t('sections.menu.cardTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('sections.menu.description')}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* İletişim Kartları */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">{t('sections.contact.title')}</h2>
          <div className="grid grid-cols-3 gap-3">
            <a href="https://wa.me/905551234567" className="block">
              <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mx-auto mb-2">
                  <WhatsAppIcon />
                </div>
                <span className="text-xs font-medium text-gray-700 block text-center">{t('sections.contact.whatsapp')}</span>
              </div>
            </a>

            <a href="tel:+905551234567" className="block">
              <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-2">
                  <PhoneIcon />
                </div>
                <span className="text-xs font-medium text-gray-700 block text-center">{t('sections.contact.phone')}</span>
              </div>
            </a>

            <a href="https://www.vikingoludeniz.com" className="block">
              <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mx-auto mb-2">
                  <WebIcon />
                </div>
                <span className="text-xs font-medium text-gray-700 block text-center">{t('sections.contact.web')}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Sosyal Medya Kartı */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">{t('sections.social.title')}</h2>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-4 gap-4">
              <a href="https://www.instagram.com/vikingoludeniz" className="block group">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500 group-hover:scale-105 transition-transform">
                  <InstagramIcon />
                </div>
              </a>
              <a href="https://www.tripadvisor.com/vikingoludeniz" className="block group">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-105 transition-transform">
                  <TripAdvisorIcon />
                </div>
              </a>
              <a href="https://www.google.com/search?q=viking+oludeniz" className="block group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                  <GoogleIcon />
                </div>
              </a>
              <a href="https://www.google.com/search?q=viking+oludeniz+reviews" className="block group">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                  <GoogleReviewIcon />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-xs text-gray-500">{t('footer.copyright')}</p>
        </footer>
      </div>
    </div>
  );
};

export default MobileCardPage;