'use client';

import { io } from 'socket.io-client';

const SOCKET_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

let socket = null;

// Lazily creates a single authenticated socket connection, reused across the app.
export function getSocket() {
  if (socket) return socket;
  const token = typeof window !== 'undefined' ? localStorage.getItem('silverlink_token') : null;
  socket = io(SOCKET_URL, {
    auth: { token },
    autoConnect: true,
  });
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
