import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  socket = io('http://localhost:3000', {
    auth: {
      token: token,
    },
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;
