import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import notesReducer from './notesSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
