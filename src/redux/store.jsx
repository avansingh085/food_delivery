// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './globSlice';
import menu from './menuSlice';
import user from './userSlice';
import socket from './socketSlice'
import incomingOrders from './incomingOrderSlice';
const store = configureStore({
  reducer: {
    user,
    menu,
    socket,
    incomingOrders,
  },
});

export default store;
