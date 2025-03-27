import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-500"></div>
        <div className="mt-4 text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingScreen; 