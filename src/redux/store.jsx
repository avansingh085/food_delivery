// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './globSlice';

const store = configureStore({
  reducer: {
    Data: counterReducer, 
  },
});

export default store;
