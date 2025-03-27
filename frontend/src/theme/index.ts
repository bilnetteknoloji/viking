import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Renk modu yapılandırması
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Renk paleti
const colors = {
  brand: {
    50: '#e6f7ff',
    100: '#b3e0ff',
    200: '#80caff',
    300: '#4db3ff',
    400: '#1a9dff',
    500: '#0086e6',
    600: '#0069b3',
    700: '#004d80',
    800: '#00304d',
    900: '#00141f',
  },
  secondary: {
    50: '#f5f9ff',
    100: '#dae5ff',
    200: '#bed1ff',
    300: '#a3beff',
    400: '#87aaff',
    500: '#6c96ff',
    600: '#5177cc',
    700: '#375999',
    800: '#1c3b66',
    900: '#021d33',
  },
};

// Yazı tipi
const fonts = {
  heading: '"Inter", sans-serif',
  body: '"Inter", sans-serif',
};

// Bileşen stilleri
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      p: '20px',
      bg: 'white',
      borderRadius: 'lg',
      boxShadow: 'md',
    },
  },
};

// Tema oluşturma
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
});

export default theme; 