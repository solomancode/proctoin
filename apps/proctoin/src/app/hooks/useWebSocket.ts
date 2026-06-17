import { io, Socket } from "socket.io-client";
import { GlobalState } from "../context";

export const useWebSocket = () => {

    const connect = async (proctorId: string) => {
      return new Promise((resolve, reject) => {
        const socket = io('http://localhost:3333');
        socket.on('error', reject);
        socket.on('connect', () => {
          resolve(socket);
        });
      })
    }

  return { connect }
}
