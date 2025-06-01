import { useEffect, useReducer, useState } from "react"
import socket from "../utils/socket.js";
import { useOnlineGameStore } from "../store/useOnlineGameStore.js";

import { checkWinner} from '../utils/gameloader.js';


let queueX = [];
let queueO = [];

export default function DisplayOnlineBoard({whichPlayer}) {
    const {opponentSocketId, userSoketId, opponentName, userName} = useOnlineGameStore();

    const [board, setBoard] = useState([]);
    const [nowPlayer, setNowPlayer] = useState('X');
    const [winScoreX, setWinScoreX] = useState(0);
    const [winScoreO, setWinScoreO] = useState(0);
    const [gameOver, setGameOver] = useState(false);



    useEffect(() => {
        setBoard(Array(9).fill(''));
        setNowPlayer('X')
        queueX = [];
        queueO = [];
        setWinScoreX(0);
        setWinScoreO(0);
        setGameOver(false);
    }, [])



    // message receiver
    useEffect(() => {
        socket.on('received-message', receiverMessage);
        return () => {
            socket.off('received-message', receiverMessage);
        };
    }, [])

    
    function increaseWinPoint(player) {
        if (player == 'X') {
            setWinScoreX((s) => s + 1);
        } else {
            setWinScoreO((s) => s + 1);
        }
    }
    
    function insertMove(index, player) {

        const copyBoard = [...board];
        copyBoard[index] = player;
        
        if (checkWinner(copyBoard, player)) {
            
            
            // win player play first
            setNowPlayer(player);
            
            setGameOver(true);
            
            increaseWinPoint(player);

            // console.log("x", winScoreX, "O", winScoreO);
             
            sendBoardData(copyBoard, player, true);
            return;

        }
    
        
        if (player == 'X') {
            queueX.push(index);
        
            if (queueX.length == 4) {
                copyBoard[queueX[0]] = '';
                queueX.shift();
            }
        } else {
            queueO.push(index);
            
            if (queueO.length == 4) {
                copyBoard[queueO[0]] = '';
                queueO.shift();
            }
        }
        
        // console.log("queueX ", queueX)
        // console.log("queueO ", queueO)
        // console.log("player", player, index);
        // console.log("data", copyBoard);

        const newplayer = nowPlayer == 'X' ? 'O' : 'X'
        

        sendBoardData(copyBoard, newplayer);

        setNowPlayer(newplayer);
        setBoard(copyBoard);
    }


    function handleInput(index) {
        if(board[index] != '' || whichPlayer != nowPlayer) return;

        insertMove(index, nowPlayer);
    }


    const sendBoardData = (copyBoard, newplayer, gameover=false) => {
        const obj = {
            opponentSocketId,
            userSoketId,
            nowPlayer: newplayer,
            boardValues: copyBoard,
            gameover: gameover,
            queueX,
            queueO,
            winScoreX,
            winScoreO 
        }

        // send to opponent
        socket.emit('sender-message', obj);
    }
  
    const receiverMessage = (data) => {
        // console.log("recie", data?.boardValues, data?.nowPlayer);
        if (checkWinner(data?.boardValues, data?.nowPlayer)) {
            setGameOver(true);
        }

        setBoard(data?.boardValues)
        
        queueO = data?.queueO;
        queueX = data?.queueX;


        setWinScoreO(data?.winScoreO)
        setWinScoreX(data?.winScoreX)
        
        setNowPlayer(data?.nowPlayer);

        setGameOver(data?.gameover);
        

        // console.log("received data", data);
    }


    function handleClickResetGame(){
      queueX = [];
      queueO = [];
      setBoard(Array(9).fill(''));
      setGameOver(false);
      
      
      // now send response
      if(whichPlayer !== nowPlayer) {
        increaseWinPoint(nowPlayer);
        return;
      }

      sendBoardData(Array(9).fill(''), nowPlayer);
    }


    useEffect(() => {
      if(whichPlayer !== nowPlayer) {
        sendBoardData(Array(9).fill(''), nowPlayer);
      }
    }, [winScoreO, winScoreX])

    return (
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#001f3f] to-[#003f7f] px-4 py-8">
    <div className="text-white w-full max-w-md mx-auto flex flex-col items-center">

      {/* Opponent Name */}
      <div className="text-lg text-center sm:text-2xl w-full mb-5 px-4 text-blue-400">
        {whichPlayer === 'X' ? opponentName.charAt(0).toUpperCase() + opponentName.slice(1) : userName.charAt(0).toUpperCase() + userName.slice(1)}
      </div>

      {/* Top Score Row */}
      <div className="flex justify-between items-center text-xl sm:text-2xl w-full mb-4 max-w-sm ">
        <div className="text-lg">Wins: {winScoreO}</div>
        <div className={`${nowPlayer === 'O' ? "text-blue-400 font-bold" : "text-white"}`}>O</div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg w-full max-w-sm aspect-square">
        {board?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleInput(index)}
            className={`aspect-square flex justify-center items-center text-5xl sm:text-6xl font-extrabold cursor-pointer border border-white/30 bg-white/20 rounded-lg hover:bg-white/30 transition
              ${item === 'X' ? 'text-red-400' : item === 'O' ? 'text-blue-400' : 'text-white'}
            `}
            aria-label={`Cell ${index + 1}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Bottom Score Row */}
      <div className="flex justify-between items-center text-xl sm:text-2xl w-full mt-4 max-w-sm ">
        <div className={`${nowPlayer === 'X' ? "text-red-400 font-bold" : "text-white"}`}>X</div>
        <div className="text-lg">Wins: {winScoreX}</div>
      </div>

      {/* Username */}
      <div className="text-lg text-center sm:text-2xl w-full mt-4 px-4 text-red-400">
        {whichPlayer === 'X' ? userName.charAt(0).toUpperCase() + userName.slice(1) : opponentName.charAt(0).toUpperCase() + opponentName.slice(1)}
      </div>
    </div>

    {/* Overlay on Game Over */}
    {gameOver && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 flex justify-center items-center px-4">
        <div className="bg-white/10 text-white text-3xl rounded-xl shadow-xl p-8 max-w-sm w-full text-center space-y-6">
          <p className="font-semibold">{nowPlayer} Won!</p>
          <button
            onClick={handleClickResetGame}
            className="bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-lg text-white text-xl font-semibold"
          >
            Play Again
          </button>
        </div>
      </div>
    )}
  </div>
);


}
