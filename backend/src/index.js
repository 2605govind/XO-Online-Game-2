import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectRouter from './Routes/connectionRoutes.js';
import {app, server} from './lib/socket.js'

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json());
app.use("/connect", connectRouter)

server.listen(process.env.PORT, () => {
    console.log("server is running on ", process.env.PORT)
})


