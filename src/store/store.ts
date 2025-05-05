// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice';
import userReducer from '@/store/userSlice'
import { api } from '@/services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;