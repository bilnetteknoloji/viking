import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  FireIcon, 
  SparklesIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular: boolean;
  calories?: string;
  prepTime?: string;
  isSpicy?: boolean;
}

interface MenuData {
  [key: string]: MenuItem[];
}

// Menü verileri
const menuData: MenuData = {
  yemekler: [
    {
      id: 1,
      name: 'Izgara Levrek',
      description: 'Mevsim sebzeleri eşliğinde servis edilir',
      price: 180,
      image: '/assets/menu/grilled-fish.jpg',
      popular: true,
      calories: '350 kcal',
      prepTime: '25-30 dk',
      isSpicy: false,
    },
    {
      id: 2,
      name: 'Karışık Izgara',
      description: 'Tavuk, köfte ve dana eti. Pilav ile servis edilir',
      price: 160,
      image: '/assets/menu/mixed-grill.jpg',
      popular: false,
    },
    {
      id: 3,
      name: 'Izgara Köfte',
      description: 'Özel baharatlarla marine edilmiş dana köfte',
      price: 140,
      image: '/assets/menu/meatballs.jpg',
      popular: false,
    },
    {
      id: 4,
      name: 'Tavuk Şiş',
      description: 'Marine edilmiş tavuk göğsü, ızgara sebzeler ile',
      price: 130,
      image: '/assets/menu/chicken-skewer.jpg',
      popular: true,
    },
  ],
  salatalar: [
    {
      id: 5,
      name: 'Akdeniz Salata',
      description: 'Domates, salatalık, biber, zeytin, peynir',
      price: 90,
      image: '/assets/menu/mediterranean-salad.jpg',
      popular: true,
    },
    {
      id: 6,
      name: 'Ton Balıklı Salata',
      description: 'Marul, ton balığı, mısır, zeytin ve özel sos',
      price: 110,
      image: '/assets/menu/tuna-salad.jpg',
      popular: false,
    },
  ],
  mezeler: [
    {
      id: 7,
      name: 'Humus',
      description: 'Geleneksel nohut ezmesi',
      price: 70,
      image: '/assets/menu/hummus.jpg',
      popular: false,
    },
    {
      id: 8,
      name: 'Cacık',
      description: 'Yoğurt, salatalık, sarımsak ve nane',
      price: 60,
      image: '/assets/menu/cacik.jpg',
      popular: true,
    },
    {
      id: 9,
      name: 'Patlıcan Ezme',
      description: 'Kömürde közlenmiş patlıcan',
      price: 75,
      image: '/assets/menu/eggplant-meze.jpg',
      popular: false,
    },
  ],
  icecekler: [
    {
      id: 10,
      name: 'Meşrubatlar',
      description: 'Coca Cola, Fanta, Sprite, Ayran',
      price: 30,
      image: '/assets/menu/soft-drinks.jpg',
      popular: false,
    },
    {
      id: 11,
      name: 'Taze Sıkılmış Portakal Suyu',
      description: '300 ml',
      price: 45,
      image: '/assets/menu/orange-juice.jpg',
      popular: true,
    },
    {
      id: 12,
      name: 'Türk Kahvesi',
      description: 'Geleneksel Türk kahvesi',
      price: 40,
      image: '/assets/menu/turkish-coffee.jpg',
      popular: false,
    },
    {
      id: 13,
      name: 'Çay',
      description: 'Demlik çay',
      price: 15,
      image: '/assets/menu/turkish-tea.jpg',
      popular: true,
    },
    {
      id: 14,
      name: 'Bira',
      description: 'Efes, Tuborg, Bomonti (50cl)',
      price: 80,
      image: '/assets/menu/beer.jpg',
      popular: false,
    },
  ]
};

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('yemekler');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Banner ve Header - Mobil için optimize edildi */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/menu-banner.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 tracking-tight text-center">Viking Menü</h1>
          <p className="text-base sm:text-lg opacity-90 font-light">Eşsiz Lezzetler</p>
        </div>
        <Link 
          to="/" 
          className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center text-white hover:text-blue-100 transition-all group"
        >
          <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm group-hover:bg-white/20">
            <ArrowLeftIcon className="w-5 h-5" />
          </div>
        </Link>
      </div>
      
      <div className="w-full px-3 sm:px-4 -mt-6 sm:-mt-8">
        {/* Kategori Seçimi - Mobil için optimize edildi */}
        <div className="mb-6 sticky top-2 z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-1.5 sm:p-2">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-1 px-1 sm:p-2">
              {Object.entries({
                yemekler: { icon: FireIcon, label: 'Ana Yemekler' },
                salatalar: { icon: SparklesIcon, label: 'Salatalar' },
                mezeler: { icon: HeartIcon, label: 'Mezeler' },
                icecekler: { icon: StarIcon, label: 'İçecekler' }
              }).map(([key, { icon: Icon, label }]) => (
                <button 
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`
                    flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm font-medium transition-all whitespace-nowrap
                    ${activeCategory === key 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20 scale-[1.02]' 
                      : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'}
                  `}
                >
                  <Icon className="w-4 h-4 mr-1.5 sm:mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Menü İçeriği - Mobil için optimize edildi */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 pb-6 sm:pb-12">
          {menuData[activeCategory as keyof typeof menuData].map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex items-center p-3 gap-3 min-h-[88px] sm:min-h-[100px]"
              onClick={() => setSelectedItem(item)}
            >
              {/* Resim Bölümü */}
              <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] relative overflow-hidden flex-shrink-0 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {item.popular && (
                  <div className="absolute top-1 right-1">
                    <div className="bg-red-500 w-2 h-2 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* İçerik Bölümü */}
              <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-0.5">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 flex-shrink-0 ml-2">₺{item.price}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] sm:text-xs text-gray-500">
                  {item.calories && (
                    <div className="flex items-center">
                      <FireIcon className="w-3 h-3 mr-0.5 text-orange-500" />
                      {item.calories}
                    </div>
                  )}
                  {item.prepTime && (
                    <div className="flex items-center">
                      <SparklesIcon className="w-3 h-3 mr-0.5 text-blue-500" />
                      {item.prepTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Bilgisi - Mobil için optimize edildi */}
      <div className="bg-gradient-to-b from-transparent to-gray-50">
        <div className="w-full px-3 sm:px-4 py-6 sm:py-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Özel Diyet İhtiyaçları</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Alerjenlere karşı hassasiyetiniz varsa veya özel diyet gereksinimleriniz varsa, lütfen personelimizi bilgilendirin.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <div className="flex items-center bg-green-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                  <SparklesIcon className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 mr-1.5 sm:mr-2" />
                  <span className="text-xs sm:text-sm text-green-700">Vejetaryen</span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                  <HeartIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-1.5 sm:mr-2" />
                  <span className="text-xs sm:text-sm text-blue-700">Glutensiz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage; 