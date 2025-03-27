import { ReactNode, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useSupabase } from './SupabaseContext';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Auth durumu için Recoil atom
export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  }
});

// Auth Provider bileşeni
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [, setAuth] = useRecoilState(authState);
  const { supabase } = useSupabase();

  // Oturum durumunu kontrol et
  useEffect(() => {
    // Mevcut oturumu kontrol et
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (session) {
          // Kullanıcı rolünü al
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (userError) {
            throw userError;
          }

          setAuth({
            isAuthenticated: true,
            user: session.user,
            role: userData?.role || null,
            loading: false,
          });
        } else {
          setAuth({
            isAuthenticated: false,
            user: null,
            role: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Auth error:', error);
        setAuth({
          isAuthenticated: false,
          user: null,
          role: null,
          loading: false,
        });
      }
    };

    checkSession();

    // Auth durumu değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Kullanıcı rolünü al
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (userError) {
            console.error('User data error:', userError);
          }

          setAuth({
            isAuthenticated: true,
            user: session.user,
            role: userData?.role || null,
            loading: false,
          });
        } else if (event === 'SIGNED_OUT') {
          setAuth({
            isAuthenticated: false,
            user: null,
            role: null,
            loading: false,
          });
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, setAuth]);

  // JSX elementi döndür
  return <>{children}</>;
};

export default AuthProvider; 