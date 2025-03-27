import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-brand-500">Daily Tour Ticket</div>
            <p className="text-sm text-gray-600 mt-1">
              {t('footer.slogan', 'Book amazing boat tours with ease')}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-800 mb-2">{t('footer.navigation', 'Navigation')}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-sm text-gray-600 hover:text-brand-500">{t('nav.home')}</a></li>
                <li><a href="/tours" className="text-sm text-gray-600 hover:text-brand-500">{t('nav.tours')}</a></li>
                <li><a href="/about" className="text-sm text-gray-600 hover:text-brand-500">{t('nav.about', 'About')}</a></li>
                <li><a href="/contact" className="text-sm text-gray-600 hover:text-brand-500">{t('nav.contact', 'Contact')}</a></li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-gray-800 mb-2">{t('footer.legal', 'Legal')}</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-sm text-gray-600 hover:text-brand-500">{t('footer.terms', 'Terms & Conditions')}</a></li>
                <li><a href="/privacy" className="text-sm text-gray-600 hover:text-brand-500">{t('footer.privacy', 'Privacy Policy')}</a></li>
                <li><a href="/cookies" className="text-sm text-gray-600 hover:text-brand-500">{t('footer.cookies', 'Cookie Policy')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            &copy; {currentYear} Daily Tour Ticket App. {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 