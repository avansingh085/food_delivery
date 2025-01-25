// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './globSlice';

const store = configureStore({
  reducer: {
    Data: counterReducer, // Add your slices here
  },
});

export default store;
