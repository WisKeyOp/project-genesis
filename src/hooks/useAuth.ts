import { useState, useEffect } from 'react';

const AUTH_KEY = 'vetty_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(auth === 'true');
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === 'admin@test.com' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
