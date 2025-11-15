import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tokenUtils } from '../../../utils/token.utils';
import type { User, AuthContextType } from '../types/auth.types';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roles: Array<'admin' | 'trainer' | 'client'> = ['admin', 'trainer', 'client'];
    for (const role of roles) {
      const storedToken = tokenUtils.getToken(role);
      const storedUser = localStorage.getItem(`${role}_user`);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        break;
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((token: string, user: User, role?: 'admin' | 'client' | 'trainer') => {
    tokenUtils.setToken(token, role);
    localStorage.setItem(`${role || 'client'}_user`, JSON.stringify(user));
    setUser(user);
    setToken(token);
  }, []);

  const logout = useCallback((role?: 'admin' | 'client' | 'trainer') => {
    tokenUtils.clearToken(role);
    localStorage.removeItem(`${role || 'client'}_user`);
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((updatedFields: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, ...updatedFields };

      const role = updatedUser.role || 'client';
      localStorage.setItem(`${role}_user`, JSON.stringify(updatedUser));

      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
};