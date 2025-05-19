import { io } from 'socket.io-client';
let socket = null;
export const initSocket = (params = {}, force = false) => {
  if (!socket || force) {
    if (socket) {
      socket.disconnect(); 
    }
    socket = io('http://localhost:3001', {
      auth: {
        userId: params.userId,
      },
    });
    console.log('🔌 Socket initialized');
  }
  return socket;
};
export const getSocket = () => socket;
