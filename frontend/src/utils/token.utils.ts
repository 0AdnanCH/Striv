import { UserRole, type UserRoleType } from "../constants/userRole.constant";

export const tokenUtils = {
  getToken(role?: UserRoleType) {
    if (role === UserRole.ADMIN) return localStorage.getItem('admin_token');
    if (role === UserRole.TRAINER) return localStorage.getItem('trainer_token');
    return localStorage.getItem('access_token'); // default client token
  },

  setToken(token: string, role?: UserRoleType) {
    const key = role === UserRole.ADMIN ? 'admin_token' : role === UserRole.TRAINER ? 'trainer_token' : 'access_token';
    localStorage.setItem(key, token);
  },

  clearToken(role?: UserRoleType) {
    const key = role === UserRole.ADMIN ? 'admin_token' : role === UserRole.TRAINER ? 'trainer_token' : 'access_token';
    localStorage.removeItem(key);
  }
};