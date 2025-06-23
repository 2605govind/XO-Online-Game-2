import { create } from 'zustand'
import socket from '../utils/socket';
import {checkWinner} from '../utils/gameloader.js'
import {navigate} from '../hook/useNavigate.js'

export const useOnlineGameStore = create((set, get) => ({
    playGame: false,

    roomid: null,
    createrName: "",
    follwerName: "",


    board: Array(9).fill(''),
    nowPlayer: 'X',
    queueX: [],
    queueO: [],
    winScoreX: 0,
    winScoreO: 0,
    gameOver: false,


    boardValueReset: () => {
        set({board: Array(9).fill(''),
            nowPlayer: 'X',
            queueX: [],
            queueO: [],
            winScoreX: 0,
            winScoreO: 0,
            gameOver: false,

          });
    },

    sendDataToSocketRoom: (board, nowPlayer, queueX, queueO, winScoreX, winScoreO, gameOver) => {
        const {roomid} = get();
        socket.emit('send-data', {roomid, data: {
            board, nowPlayer, queueX, queueO, winScoreX, winScoreO, gameOver,
        }})
    },

    insertMove: (index, player) => {
        const copyBoard = [...get().board];
        copyBoard[index] = player;
        
        if (checkWinner(copyBoard, player)) {

            let copyWinScoreX = get().winScoreX;
            let copyWinScoreO = get().winScoreO;


            // win player play first
            if (player == 'X') {
                copyWinScoreX = copyWinScoreX + 1;
                set({winScoreX: copyWinScoreX})
            } else {
                copyWinScoreO = copyWinScoreO + 1;
                set({winScoreO: copyWinScoreO})
            }

            set({nowPlayer: player, gameOver: true});        

            // send data
            const {queueX, queueO} = get();
            get().sendDataToSocketRoom(copyBoard, player, queueX, queueO, copyWinScoreX, copyWinScoreO, true);

            return;
        }
    
        const copyqueueX = [...get().queueX];
        const copyqueueO = [...get().queueO];

        if (player == 'X') {
            copyqueueX.push(index);
        
            if (copyqueueX.length == 4) {
                copyBoard[copyqueueX[0]] = '';
                copyqueueX.shift();
            }

            set({queueX: copyqueueX});
            
        } else {
            
            
            copyqueueO.push(index);
            
            if (copyqueueO.length == 4) {
                copyBoard[copyqueueO[0]] = '';
                copyqueueO.shift();
            }

            set({queueO: copyqueueO});
        }
        

        const newplayer = (player == 'X') ? 'O' : 'X'
        
        set({nowPlayer: newplayer, board: copyBoard})


        // send
        const {winScoreX, winScoreO, gameOver} = get();
        get().sendDataToSocketRoom(copyBoard, newplayer, copyqueueX, copyqueueO, winScoreX, winScoreO, gameOver);
    },


    setRoomId: (roomid) => {
        set({roomid: roomid});
    },

    makePlayGround: async () => {
        try {

            set({playGame: false});

            if (!socket.connected) {
                socket.connect();
            }

            await new Promise((resolve) => {
                const handleConnect = () => {
                    socket.off('connect', handleConnect);
                    resolve();
                }
                if (socket.connected) {
                    // already connected
                    resolve();
                } else {
                    socket.once('connect', handleConnect); // wait for connect
                }
            });


            socket.on('new-data-save', (data) => {
                const {board, nowPlayer, queueX, queueO, winScoreX, winScoreO, gameOver} = data
                set({
                    board: board,
                    nowPlayer: nowPlayer,
                    queueX: queueX,
                    queueO: queueO,
                    winScoreX: winScoreX,
                    winScoreO: winScoreO,
                    gameOver: gameOver
                })
            })


            socket.on('start-game', (data) => {
                set({createrName: data.createrName, follwerName: data.followerName, playGame: true});
            })                


            socket.on('playground-reset', (gameSrt) => {
                console.log("hwllo");
                navigate('/');
                get().boardValueReset();
            })

        } catch (error) {
            console.log("error at makeplayground ", error);
        }
    },

    destroyPlayGround: async () => {
        try {
            await new Promise((resolve) => {
                if (socket.connected) {
                    socket.disconnect();
                    resolve();
                } else {
                    resolve();
                }
            });


            socket.off('start-game', (data) => {
                set({createrName: data.createrName, follwerName: data.followerName, playGame: true});
            })   

            socket.off('new-data-save', (data) => {
                const {board, nowPlayer, queueX, queueO, winScoreX, winScoreO, gameOver} = data
                set({
                    board: board,
                    nowPlayer: nowPlayer,
                    queueX: queueX,
                    queueO: queueO,
                    winScoreX: winScoreX,
                    winScoreO: winScoreO,
                    gameOver: gameOver
                })
            })      
            
            socket.off('playground-reset', (gameSrt) => {
                console.log("hwllo");
                navigate('/');
                get().boardValueReset();
            })


        } catch (error) {
            console.log("error at destroyPlayGround, ", error);
        }

    },


    handleClickResetGame: () => {
        get().sendDataToSocketRoom(Array(9).fill(''), get().nowPlayer, [], [], get().winScoreX, get().winScoreO, false);
    }
}))