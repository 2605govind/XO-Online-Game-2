import express  from 'express'
import { connectWithURL } from '../controller/connectionController.js';
const connectRouter = express.Router();


// connectRouter.get('/getlocation', getLocation);
connectRouter.post('/connecttocreter', connectWithURL);


export default connectRouter;