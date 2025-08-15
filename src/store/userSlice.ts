// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/user'


interface UserState {
  data: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: true,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;