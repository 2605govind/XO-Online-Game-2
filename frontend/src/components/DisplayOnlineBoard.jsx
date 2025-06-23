import { useEffect } from "react"
import { useOnlineGameStore } from "../store/useOnlineGameStore.js";
import { useNavigate } from "react-router";

export default function DisplayOnlineBoard({whichPlayer}) {
  const navigate = useNavigate();
  const {nowPlayer, winScoreO, winScoreX,board, insertMove, gameOver, handleClickResetGame , createrName, follwerName, boardValueReset,  queueX, queueO,} = useOnlineGameStore();

  useEffect(() => {
      boardValueReset()
  }, [])

  
  function handleInput(index) {
      if(board[index] != '' || whichPlayer != nowPlayer) return;
      insertMove(index, nowPlayer);
  }


  function colorOfPieceTimeLine(queue, player, index) {
    let color ='';
    if(player === 'X') {
      color = ['text-red-500', 'text-red-600', 'text-red-700'];

    }else{
      color = ['text-blue-500', 'text-blue-600', 'text-blue-700'];
    }

    let k = 3;
      for(let i = queue.length-1; i >= 0; i--) {
        k--;
        if(queue[i] == index) {
          return color[k];
        } 
      }

      return 'text-white'
  }

  function hanldeCloseClicked(){
    navigate('/');
  }
  

  if(createrName === '' && follwerName === '') {
        return  (
          <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin"></div>
              <p className="text-lg font-semibold">Loading, please wait...</p>
            </div>
          </div>
        );
  }

  return (
  <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-8 select-none">
    
    {/* Close Button */}
    <button
      className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl font-bold transition"
      onClick={() => hanldeCloseClicked()} // replace with your logic
      aria-label="Close Game"
    >
      ✕
    </button>

    <div className="text-white w-full max-w-md mx-auto flex flex-col items-center">
      
      {/* Turn Indicator */}
      <div className="text-lg text-center sm:text-2xl w-full mb-8 px-4 text-gray-200 font-medium">
        {nowPlayer}'s Turn
      </div>

      {/* Top Score Row */}
      <div className={`flex justify-between items-center text-lg sm:text-xl w-full mb-4 max-w-sm font-medium ${whichPlayer === 'X' ? 'text-blue-600' : 'text-red-600'} font-bold`}>
        <div className="text-gray-100">
          Wins: {whichPlayer === 'X' ? winScoreO : winScoreX}
        </div>
        <div className="flex items-center">
          <span className="pr-2 text-gray-100">
            {whichPlayer === 'X' ? follwerName : createrName}
          </span>
          <span className={`text-5xl ${nowPlayer === (whichPlayer === 'X' ? 'O' : 'X') ? 'player-active' : ''}`}>
            {whichPlayer === 'X' ? 'O' : 'X'}
          </span>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 bg-[#1e1e1e] p-5 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-full max-w-sm aspect-square border border-[#555]">
        {board?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleInput(index)}
            className={`aspect-square flex justify-center items-center text-5xl sm:text-6xl font-bold cursor-pointer border border-[#555] rounded-lg hover:bg-[#333] transition
              ${item === 'X' ? colorOfPieceTimeLine(queueX, item, index) : item === 'O' ? colorOfPieceTimeLine(queueO, item, index) : 'text-white'}
            `}
            aria-label={`Cell ${index + 1}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Bottom Score Row */}
      <div className={`flex justify-between items-center text-lg sm:text-xl w-full mt-4 max-w-sm font-medium ${whichPlayer === 'X' ? 'text-red-600' : 'text-blue-600'} font-bold`}>
        <div className="flex items-center">
          <span className={`text-5xl ${nowPlayer === (whichPlayer === 'X' ? 'X' : 'O') ? 'player-active' : ''}`}>
            {whichPlayer === 'X' ? 'X' : 'O'}
          </span>
          <span className="pl-2 text-gray-100">
            {whichPlayer === 'X' ? createrName : follwerName}
          </span>
        </div>
        <div className="text-gray-100">
          Wins: {whichPlayer === 'X' ? winScoreX : winScoreO}
        </div>
      </div>
    </div>

    {/* Game Over Modal */}
    {gameOver && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 flex justify-center items-center px-4">
        <div className="bg-[#1e1e1e] text-white text-3xl rounded-xl shadow-xl p-8 max-w-sm w-full text-center space-y-6 border border-[#444]">
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
