import {io, socketIdsOfOpponentUserMap} from '../lib/socket.js'

// export const getLocation = async (req, res) => {
//   try {
//     const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

//     if (ip === '::1' || ip.startsWith('127.') || ip.startsWith('::ffff:127')) {
//       return res.send('You are on localhost. No geolocation available.');
//     }

//     const response = await fetch(`http://ip-api.com/json/${ip}`);
//     const location = await response.json();

//     res.json({
//       country: location.country,
//       region: location.regionName,
//       city: location.city,
//     });

//   } catch (error) {
//     console.error("Error at getLocation controller");
//     res.status(500).send('Error getting location');
//   }
// }


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
