import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const microServiceUrl = import.meta.env.VITE_MCS_URL;
export const connectSocket = (token: string): Socket => {
  socket = io(microServiceUrl, {
    auth: {
      token: token,
    },
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;
