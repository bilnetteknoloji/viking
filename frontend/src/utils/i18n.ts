import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default translations
const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "tours": "Tours",
        "reservations": "Reservations",
        "tickets": "Tickets",
        "profile": "Profile",
        "settings": "Settings",
        "admin": "Admin Panel",
        "about": "About",
        "contact": "Contact"
      },
      "common": {
        "login": "Login",
        "register": "Register",
        "logout": "Logout",
        "submit": "Submit",
        "loading": "Loading...",
        "success": "Success",
        "error": "Error"
      },
      "reservation": {
        "create": "Create Reservation",
        "fullName": "Full Name",
        "nationality": "Nationality",
        "identityNumber": "Identity Number / Passport Number",
        "phone": "Phone Number",
        "peopleCount": "Number of People",
        "accommodationAddress": "Accommodation Address",
        "tourDate": "Tour Date",
        "tourSelection": "Select Tour",
        "requiredField": "This field is required",
        "successMessage": "Reservation created successfully!",
        "errorMessage": "An error occurred while creating the reservation."
      },
      "footer": {
        "slogan": "Book amazing boat tours with ease",
        "navigation": "Navigation",
        "legal": "Legal",
        "terms": "Terms & Conditions",
        "privacy": "Privacy Policy",
        "cookies": "Cookie Policy",
        "allRightsReserved": "All rights reserved."
      }
    }
  },
  tr: {
    translation: {
      "nav": {
        "home": "Ana Sayfa",
        "tours": "Turlar",
        "reservations": "Rezervasyonlar",
        "tickets": "Biletler",
        "profile": "Profil",
        "settings": "Ayarlar",
        "admin": "Yönetim Paneli",
        "about": "Hakkımızda",
        "contact": "İletişim"
      },
      "common": {
        "login": "Giriş Yap",
        "register": "Kayıt Ol",
        "logout": "Çıkış Yap",
        "submit": "Gönder",
        "loading": "Yükleniyor...",
        "success": "Başarılı",
        "error": "Hata"
      },
      "reservation": {
        "create": "Rezervasyon Oluştur",
        "fullName": "Ad Soyad",
        "nationality": "Uyruk",
        "identityNumber": "Kimlik Numarası / Pasaport Numarası",
        "phone": "Telefon Numarası",
        "peopleCount": "Kişi Sayısı",
        "accommodationAddress": "Konaklama Adresi",
        "tourDate": "Tur Tarihi",
        "tourSelection": "Tur Seç",
        "requiredField": "Bu alan zorunludur",
        "successMessage": "Rezervasyon başarıyla oluşturuldu!",
        "errorMessage": "Rezervasyon oluşturulurken bir hata oluştu."
      },
      "footer": {
        "slogan": "Tekne turlarını kolayca rezerve edin",
        "navigation": "Navigasyon",
        "legal": "Yasal",
        "terms": "Kullanım Şartları",
        "privacy": "Gizlilik Politikası",
        "cookies": "Çerez Politikası",
        "allRightsReserved": "Tüm hakları saklıdır."
      }
    }
  }
};

// Initialize i18n instance
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n; 