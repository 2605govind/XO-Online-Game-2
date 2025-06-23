import { io } from 'socket.io-client';

const BASE_URL = `${import.meta.env.VITE_REACT_BACKEND_BASEURL}`;
const socket = io(BASE_URL, {
    autoConnect: false, // Prevent auto-connect
    transports: ['websocket'], // Optional: avoid polling
});

export default socket;
export {io};