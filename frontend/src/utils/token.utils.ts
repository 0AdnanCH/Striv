export const tokenUtils = {
  getToken(role?: 'admin' | 'client' | 'trainer') {
    if (role === 'admin') return localStorage.getItem('admin_token');
    if (role === 'trainer') return localStorage.getItem('trainer_token');
    return localStorage.getItem('access_token'); // default client token
  },

  setToken(token: string, role?: 'admin' | 'client' | 'trainer') {
    const key = role === 'admin' ? 'admin_token' : role === 'trainer' ? 'trainer_token' : 'access_token';
    localStorage.setItem(key, token);
  },

  clearToken(role?: 'admin' | 'client' | 'trainer') {
    const key = role === 'admin' ? 'admin_token' : role === 'trainer' ? 'trainer_token' : 'access_token';
    localStorage.removeItem(key);
  }
};