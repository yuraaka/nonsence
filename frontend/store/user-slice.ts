import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: string | null;
  token: string | null;
}

const initialState: UserState = { user: null, token: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
