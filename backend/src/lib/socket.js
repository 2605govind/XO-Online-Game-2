import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import 'dotenv/config'

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

export const socketIdsOfOpponentUserMap = {};

io.on('connection', (socket) => {
    // console.log("new user connected ", socket.id);

    // handle playground out
    socket.on('playground-disconnected', ({ opponentId }) => {
        io.to(opponentId).emit('playground-reset', false);
    })


    socket.on('sender-message', (obj) => {
        io.to(obj.opponentSocketId).emit('received-message', obj);
    })


    socket.on('disconnect', () => {
        let sendId = socketIdsOfOpponentUserMap[socket.id];

        if(!sendId) {
            for(let key in socketIdsOfOpponentUserMap){
                if(socketIdsOfOpponentUserMap[key] == socket.id) {
                    sendId = key;
                    delete socketIdsOfOpponentUserMap[key];
                }
            }
        }

        
        if(sendId) {
            io.to(sendId).emit('playground-reset', false);
            delete socketIdsOfOpponentUserMap[socket.id];
        }

        // console.log("disconnected ", socket.id);
    })
})


export { app, server, io };