import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://hbm-backend-production.up.railway.app/"; // Apontamento para api

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
});
