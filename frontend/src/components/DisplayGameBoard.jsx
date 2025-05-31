import { useEffect } from "react"

import { useGameStore } from '../store/useGameStore.js';



export default function DisplayGameBoard({ level }) {
    const { board, nowPlayer, gameStart, handleClickResetGame, playWithComputer, winScoreX, winScoreO, resetScore } = useGameStore();

    useEffect(() => {
        handleClickResetGame()
        resetScore();
    }, [level])


   return (
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#001f3f] to-[#003f7f] px-4">
    <div className="text-white w-full max-w-lg">
      {/* Top Score Row */}
      <div className="flex justify-between items-center text-xl sm:text-2xl mt-4 max-w-[400px] mx-auto mb-4">
        <div className="text-lg">Wins: {winScoreO}</div>
        <div className={`${nowPlayer === 'O' ? "text-blue-400 font-bold" : "text-white"}`}>O</div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-[400px] mx-auto aspect-square">
        {board.map((item, index) => (
          <div
            key={index}
            onClick={() => playWithComputer(index, level)}
            className={`
              aspect-square w-full flex justify-center items-center 
              text-4xl sm:text-5xl font-bold cursor-pointer 
              border border-white/30 bg-white/20 rounded-md 
              hover:bg-white/30 transition 
              ${item === 'X' ? 'text-red-400' : item === 'O' ? 'text-blue-400' : 'text-white'}
            `}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Bottom Score Row */}
      <div className="flex justify-between items-center text-xl sm:text-2xl mt-4 max-w-[400px] mx-auto">
        <div className={`${nowPlayer === 'X' ? "text-red-400 font-bold" : "text-white"}`}>X</div>
        <div className="text-lg">Wins: {winScoreX}</div>
      </div>
    </div>

    {/* Overlay on Game End */}
    {!gameStart && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 flex justify-center items-center px-4">
        <div className="bg-white/10 text-white text-2xl sm:text-3xl rounded-xl shadow-xl p-6 max-w-md w-full text-center space-y-5">
          <p className="font-semibold">{nowPlayer} Won!</p>
          <button
            onClick={handleClickResetGame}
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg text-white text-lg cursor-pointer"
          >
            Play Again
          </button>
        </div>
      </div>
    )}
  </div>
);


}