import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectRouter from './Routes/connectionRoutes.js';
import {app, server} from './lib/socket.js'

import path from 'path';

const __dirname = path.resolve() 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use("/connect", connectRouter)


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


server.listen(process.env.PORT, () => {
    console.log("server is running on ", process.env.PORT)
})


