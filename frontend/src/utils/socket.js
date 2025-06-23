import { io } from 'socket.io-client';

const socket = io('/', {
    autoConnect: false,
    transports: ['websocket'], // Optional: ensures real-time
});

export default socket;
export {io};