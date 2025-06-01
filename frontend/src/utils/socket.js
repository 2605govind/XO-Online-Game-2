import { io } from 'socket.io-client';


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(BASE_URL, {
    autoConnect: false, // Prevent auto-connect
    transports: ['websocket'], // Optional: avoid polling
});

export default socket;