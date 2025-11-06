export const adminTokenUtils = {
  setToken: (token: string) => localStorage.setItem('admin_token', token),
  getToken: () => localStorage.getItem('admin_token'),
  clearToken: () => localStorage.removeItem('admin_token')
};