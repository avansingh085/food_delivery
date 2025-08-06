// socket.js
import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (mobile) => {
  socket = io('http://localhost:5000', {
    auth: {
      token: localStorage.getItem('BeksToken'),
      mobile: mobile,
    },
    transports: ['websocket'],
  });

  return socket;
};

export const getSocket = () => socket;
