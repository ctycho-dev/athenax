// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  privyToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  privyToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string | null }>) => {
      state.privyToken = action.payload.token;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.privyToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;