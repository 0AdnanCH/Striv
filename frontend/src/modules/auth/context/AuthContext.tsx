import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tokenUtils } from '../../../utils/token.utils';
import type { IUser, IAuthContextType } from '../types/auth.types';
import { UserRole, type UserRoleType } from '../../../constants/userRole.constant';


const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roles: Array<UserRoleType> = Object.values(UserRole);
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

  const login = useCallback((token: string, user: IUser, role?: UserRoleType) => {
    tokenUtils.setToken(token, role);
    localStorage.setItem(`${role || UserRole.CLIENT}_user`, JSON.stringify(user));
    setUser(user);
    setToken(token);
  }, []);

  const logout = useCallback((role?: UserRoleType) => {
    tokenUtils.clearToken(role);
    localStorage.removeItem(`${role || UserRole.CLIENT}_user`);
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((updatedFields: Partial<IUser>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, ...updatedFields };

      const role = updatedUser.role || UserRole.CLIENT;
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

export const useAuthContext = (): IAuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
};