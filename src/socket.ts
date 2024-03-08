import { io } from "socket.io-client";

const URL = "wss://stream.binance.com:9443";
export const socket = io(URL);
