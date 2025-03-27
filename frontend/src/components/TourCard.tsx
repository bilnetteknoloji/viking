import React from 'react';
import { Link } from 'react-router-dom';

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  image,
  price,
  duration,
  location,
  rating,
  reviewCount,
  featured = false,
}) => {
  return (
    <div className={`
      bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl
      ${featured ? 'border-2 border-brand-400 relative' : 'border border-gray-100'}
    `}>
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Önerilen
        </div>
      )}
      
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-52 object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4">
          <div className="flex items-center">
            <svg 
              className="h-5 w-5 text-yellow-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-medium ml-1">{rating.toFixed(1)}</span>
            <span className="text-gray-300 text-sm ml-1">({reviewCount} değerlendirme)</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        
        <div className="flex items-center mb-3">
          <svg 
            className="h-5 w-5 text-gray-500 mr-1" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <span className="text-gray-600 text-sm">{location}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <svg 
            className="h-5 w-5 text-gray-500 mr-1" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="text-gray-600 text-sm">{duration}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-brand-600">{price} ₺</span>
            <span className="text-gray-600 text-sm ml-1">/ kişi</span>
          </div>
          <Link 
            to={`/tour/${id}`} 
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
          >
            Detaylar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard; 