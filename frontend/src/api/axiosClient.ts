import axios from 'axios';
import { tokenUtils } from '../utils/token.utils';
import type { UserRoleType } from '../constants/userRole.constant';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

declare module 'axios' {
  export interface AxiosRequestConfig {
    role?: UserRoleType
  }
}

axiosClient.interceptors.request.use((config) => {
  const token = tokenUtils.getToken(config.role);
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response);
    throw error;
  }
);

export default axiosClient;