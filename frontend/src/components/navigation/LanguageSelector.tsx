import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '/assets/flags/gb.svg' },
  { code: 'tr', name: 'Türkçe', flag: '/assets/flags/tr.svg' },
  { code: 'de', name: 'Deutsch', flag: '/assets/flags/de.svg' },
  { code: 'ru', name: 'Русский', flag: '/assets/flags/ru.svg' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find current language
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          className="w-5 h-5 rounded-sm object-cover"
          onError={(e) => {
            // Default image on error
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20';
          }}
        />
        <span className="hidden md:inline text-sm font-medium">{currentLanguage.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                language.code === i18n.language ? 'bg-gray-50 text-brand-600' : 'text-gray-700'
              }`}
              onClick={() => changeLanguage(language.code)}
              disabled={language.code === i18n.language}
            >
              <img
                src={language.flag}
                alt={language.name}
                className="w-5 h-5 mr-3 rounded-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20';
                }}
              />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 