import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { trainerApplicationApi } from '../modules/trainer/api/trainerApplication.api';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [trainerApplicationApi.reducerPath]: trainerApplicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false 
    }).concat(trainerApplicationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
