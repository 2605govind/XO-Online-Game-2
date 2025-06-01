import {io, socketIdsOfOpponentUserMap} from '../lib/socket.js'

export const connectWithURL = (req, res) => {
  try {
    if(!req.body) {
      throw new Error("socket id not present");
    }

    const {userId, createrId, userName} = req.body;

    socketIdsOfOpponentUserMap[userId] = createrId;

    // sending to creater
    io.to(createrId).emit('hand-shake', {opponentName: userName, opponentId: userId});
    
    // sending to opponenet for gamestart

    res.status(200).json({
      gameStart: true
    })

  } catch (error) {
    console.error("Error at connectWithURL controller");
    res.status(500).send('Error connecting ');
  }

}
