// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './globSlice';
import menu from './menuSlice';
import user from './userSlice';
const store = configureStore({
  reducer: {
    user,
    menu
  },
});

export default store;
