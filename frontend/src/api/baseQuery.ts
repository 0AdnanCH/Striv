import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenUtils } from '../utils/token.utils'; 
import { UserRole } from '../constants/userRole.constant';

export const appBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  prepareHeaders: (headers, _api) => {
    // If you ever need role from state, you can use _api.getState()
    // For this trainer module, role is always CLIENT on frontend
    const role = UserRole.CLIENT;

    const token = tokenUtils.getToken(role);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('role', role);

    return headers;
  }
});
