import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      tr: {
        translation: {
          login: {
            title: 'Giriş Yap',
            email: 'E-posta',
            password: 'Şifre',
            submit: 'Giriş Yap',
            loading: 'Giriş yapılıyor...',
            error: 'Giriş yapılırken bir hata oluştu'
          },
          dashboard: {
            title: 'Yönetim Paneli',
            welcome: 'Hoş Geldiniz',
            stats: {
              users: 'Toplam Kullanıcı',
              tours: 'Toplam Tur',
              tickets: 'Toplam Bilet',
              revenue: 'Toplam Gelir'
            }
          }
        }
      },
      en: {
        translation: {
          login: {
            title: 'Login',
            email: 'Email',
            password: 'Password',
            submit: 'Sign In',
            loading: 'Signing in...',
            error: 'An error occurred while signing in'
          },
          dashboard: {
            title: 'Dashboard',
            welcome: 'Welcome',
            stats: {
              users: 'Total Users',
              tours: 'Total Tours',
              tickets: 'Total Tickets',
              revenue: 'Total Revenue'
            }
          }
        }
      }
    }
  });

export default i18n; 