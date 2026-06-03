import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../lib/api';

interface AuthUser { email: string; }

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (stored) {
      try {
        const payload = JSON.parse(atob(stored.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser({ email: payload.email });
        } else {
          localStorage.removeItem('admin_token');
        }
      } catch {
        localStorage.removeItem('admin_token');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const data = await api.login(email, password);
    if (data.token) {
      localStorage.setItem('admin_token', data.token);
      setUser({ email });
      return null;
    }
    return data.error ?? 'Identifiants incorrects';
  };

  const signOut = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
