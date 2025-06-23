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



export const roomidsWithUsers = {};

io.on('connection', (socket) => {
    //  console.log("connected ", socket.id);

    // Join a room
    socket.on("joinRoom", async ({roomid, data}) => {
        // {roomid: roomid, data:{name: name}

        if(!roomidsWithUsers[roomid]) {
            roomidsWithUsers[roomid] = [];
        }

        if(roomidsWithUsers[roomid].length < 2) {
            socket.join(roomid);
            
            roomidsWithUsers[roomid].push({socketId: socket.id, name: data.name});

            // 
            if(roomidsWithUsers[roomid].length == 2) {
                io.to(roomid).emit('start-game', {
                    createrName: roomidsWithUsers[roomid][0].name,
                    followerName: roomidsWithUsers[roomid][1].name
                })
            }
            
            
        }
        
//         const socketsInRoom = await io.in(roomid).allSockets();
// console.log("Sockets in room", roomid, ":", socketsInRoom);

        // console.log("roomidsWithUsers", roomidsWithUsers)


        // console.log("joinRoom socket", socket.id);
    });



    socket.on("send-data", ({roomid, data}) => {
        io.to(roomid).emit('new-data-save', data);
    })


    socket.on('disconnect', () => {
        // console.log("disconnected ", socket.id);

        for(let key in roomidsWithUsers) {
            if(roomidsWithUsers[key].length == 2) {

                if(roomidsWithUsers[key][0].socketId == socket.id) {
                    socket.to(roomidsWithUsers[key][1].socketId).emit('playground-reset', true);

                    delete roomidsWithUsers[key];
                    return;
                    
                }
                if(roomidsWithUsers[key][1].socketId == socket.id) {
                    socket.to(roomidsWithUsers[key][0].socketId).emit('playground-reset', true);

                    delete roomidsWithUsers[key];
                    return;
                }
            }
        }
    })
})


export { app, server, io };