import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  TicketIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

// Özel SVG İkonlar
const CalendarIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BabyIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <circle cx="12" cy="11" r="3"></circle>
    <path d="M9 18c.9-.9 2.5-1 3.5-1s2.6.1 3.5 1"></path>
  </svg>
);

const FoodIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"></path>
    <path d="M8 12h8"></path>
    <rect x="4" y="7" width="16" height="10" rx="2"></rect>
    <path d="M6 7h12v4H6z"></path>
  </svg>
);

const DrinkIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 9l2-7h4l2 7"></path>
    <rect x="6" y="9" width="12" height="8" rx="2"></rect>
    <path d="M10 17v4"></path>
    <path d="M14 17v4"></path>
    <path d="M8 21h8"></path>
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TurBilgisiPage: React.FC = () => {
  const tourFeatures = [
    {
      icon: <CalendarIcon />,
      text: "Her Gün Mevcuttur",
      color: "bg-gray-50"
    },
    {
      icon: <BabyIcon />,
      text: "Bebekler için ücretsizdir (0-1 Yaş)",
      color: "bg-gray-50"
    },
    {
      icon: <FoodIcon />,
      text: "Öğle yemeği fiyata dahildir",
      color: "bg-gray-50"
    },
    {
      icon: <DrinkIcon />,
      text: "Teknede alkollü ve alkolsüz içecekler ücretli olarak mevcuttur",
      color: "bg-gray-50"
    },
    {
      icon: <ClockIcon />,
      text: "Kalkış: 10:30",
      color: "bg-gray-50"
    },
    {
      icon: <ClockIcon />,
      text: "Dönüş: 18:00",
      color: "bg-gray-50"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Başlık ve Logo Bölümü */}
      <div className="pt-6 px-4">
        <div className="flex flex-col items-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100 mb-4">
            <img 
              src="/assets/logo.jpg" 
              alt="Viking Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Ana Sayfa Butonu */}
          <Link to="/" className="rounded-full bg-white px-4 py-2 mb-6 shadow-sm border border-gray-100 flex items-center space-x-2 text-sm text-blue-600 font-medium hover:bg-blue-50 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span>Ana Sayfa</span>
          </Link>
        </div>
      </div>
          
      {/* Ana İçerik Kartı */}
      <div className="px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm max-w-md mx-auto overflow-hidden">
          {/* Banner Fotoğrafı */}
          <div className="w-full h-56">
            <img 
              src="/assets/boat-tour.jpg"
              alt="Viking Ölüdeniz Turu" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Google Puanı ve Yorumlar - Minimal Tarz */}
          <div className="bg-white p-3 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400 mr-1" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-medium text-gray-800">4.8</span>
              <span className="text-gray-500 text-sm ml-1">(124)</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
              </svg>
              <span className="text-gray-500 text-sm">86 Yorum</span>
            </div>
          </div>
          
          {/* İçerik */}
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800 mb-3">Tekne Turu Hakkında</h1>
            
            <p className="text-gray-600 text-sm mb-4">
              Muhteşem teknelerimizle mavi yolculuk keyfini yaşamaya sizi davet ediyoruz. Profesyonel ekibimiz ve konforlu teknelerimizle unutulmaz bir deniz deneyimi yaşayacaksınız.
            </p>
            
            <p className="text-gray-600 text-sm mb-6">
              Kristal berraklığındaki sularda yüzme molaları, güneşin tadını çıkarabileceğiniz güverte alanları ve lezzetli ikramlarla size en iyi hizmeti sunmaya hazırız.
            </p>
            
            {/* Özellik Listesi */}
            <div className="space-y-2 mb-6">
              {tourFeatures.map((feature, index) => (
                <div key={index} className={`${feature.color} p-3 rounded-lg border border-gray-100 flex items-center gap-3`}>
                  <div className="shrink-0 flex items-center justify-center text-blue-600">{feature.icon}</div>
                  <span className="text-sm text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Uyarı Bilgisi */}
            <div className="my-4 bg-amber-50 rounded-lg p-3 flex items-center border border-amber-100">
              <ExclamationCircleIcon className="w-5 h-5 text-amber-500 mr-2 shrink-0" />
              <p className="text-amber-800 text-sm">
                Lütfen kalkış saati ve rezervasyon için bilgi almayı unutmayınız.
              </p>
            </div>

            {/* Bilet Oluştur Butonu */}
            <Link 
              to="/reservations/create" 
              className="block w-full py-3 mt-4 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <TicketIcon className="w-5 h-5 mr-2" />
              Bilet Oluştur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurBilgisiPage; 