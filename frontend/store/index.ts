import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notes-slice';
import userReducer from './user-slice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
