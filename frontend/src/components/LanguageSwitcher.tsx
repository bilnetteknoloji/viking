import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed bottom-4 right-4 flex space-x-2">
      <button
        className={`btn btn-sm ${i18n.language === 'tr' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => changeLanguage('tr')}
      >
        TR
      </button>
      <button
        className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher; 