// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import shopReducer from './shopSlice';
import achievementsReducer from './achievementsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    achievements: achievementsReducer
  }
});

