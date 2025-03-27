import { createContext, useContext, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase bağlantı bilgileri
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';

// Supabase istemcisini oluştur
const supabase = createClient(supabaseUrl, supabaseKey);

// Context türü
type SupabaseContextType = {
  supabase: SupabaseClient;
};

// Context'i oluştur
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Provider bileşeni
export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Kolaylık hook'u
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

export default SupabaseContext; 