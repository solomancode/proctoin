import { Socket } from "socket.io-client";
import {  createContext } from "react";

export interface GlobalState {
  proctorId: string,
  isConnected: boolean,
  ws: null | Socket,
  errors: string[]
}

export const INITIAL_GLOBAL_STATE: GlobalState = {
  proctorId: 'p1',
  isConnected: false,
  ws: null,
  errors: []
}

export const GlobalState = createContext(INITIAL_GLOBAL_STATE);

