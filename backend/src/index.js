import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import {app, server} from './lib/socket.js'
import path from 'path';
import { fileURLToPath } from 'url';

app.use(cors({
  origin: true, // dynamically reflects the request origin
  credentials: true,
}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files


app.use(express.static(path.join(__dirname, '../../frontend/dist/')));

// app.get('/*splat', (req, res) => {
    // });
    
app.get('/{*splat}', async (req, res) => {
    // console.log(path.join(__dirname, '../../frontend/dist/index.html'));


    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
//   res.send('ok')
})

server.listen(process.env.PORT, () => {
    // console.log("server is running on ", process.env.PORT)
})


