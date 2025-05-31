import { create } from 'zustand';
import { checkWinner, getBestMove, delay } from '../utils/gameloader';

export const useGameStore = create((set, get) => ({
    board: Array(9).fill(''),
    nowPlayer: 'X',
    gameStart: true,
    queueX: [],
    queueO: [],
    boardLoading: false,

    winScoreX: 0,
    winScoreO: 0,

    insertMove: (index, player) => {
        const { board, queueO, queueX, resetGame, increaseWinPoint } = get();

        board[index] = player;

        if (checkWinner(board, player)) {

            set({ nowPlayer: player, gameStart: false });

            increaseWinPoint(player);
            return true;
        }

        if (player == 'X') {
            const newQueuX = [...queueX, index];

            if (newQueuX.length == 4) {
                board[newQueuX[0]] = '';
                newQueuX.shift();
            }

            set({ board: board, queueX: newQueuX });
        } else {
            const newQueuO = [...queueO, index];

            if (newQueuO.length == 4) {
                board[newQueuO[0]] = '';
                newQueuO.shift();
            }

            set({ board: board, queueO: newQueuO });
        }

        return false;
    },

    resetGame: () => {
        set({
            board: Array(9).fill(''),
            nowPlayer: 'X',
            gameStart: false,
            queueX: [],
            queueO: [],
        })
    },

    handleClickResetGame: () => {
        const { resetGame, gameStart } = get();
        resetGame();
        set({ gameStart: true });
    },

    moveBycomputer: (player, level) => {
        const { board } = get();
        const move = getBestMove(board, player, level);
        if (move == null) return null;

        return move;
    },

    switchPlayer: () => {
        const { nowPlayer } = get();
        set({ nowPlayer: nowPlayer == 'X' ? 'O' : 'X' });
    },

    playWithComputer: async (index, level) => {
        if(get().boardLoading == true) {
            setTimeout(() => {
                set({boardLoading: false});
            }, 1000);
            return;
        }

        set({boardLoading: true});
        const { board, insertMove,gameStart, nowPlayer, moveBycomputer, switchPlayer } = get();
        if (board[index] != '') return;

        const isFinish = insertMove(index, nowPlayer);
        if (isFinish) return;

        switchPlayer();

        await delay(1000);

        const updatedPlayer = useGameStore.getState().nowPlayer
        
        if (gameStart && updatedPlayer == 'O') {
            const move = moveBycomputer(updatedPlayer, level);
            if (move != null) {
                const isFinish = insertMove(move, updatedPlayer);
                if (!isFinish) {
                    switchPlayer();
                }
            }
        }

        

        set({boardLoading: false});
    },

    increaseWinPoint: (player) => {
        if(player == 'X') {
            set({winScoreX: get().winScoreX+1});
        }else {
            set({winScoreO: get().winScoreO+1});
        }
    },

    resetScore: () => {
        set({winScoreO: 0, winScoreX: 0});
    },

    setBoard: (boarData) => {
        set({board: boarData});
    },

    setnowPlayer: (player) => {
        set({nowPlayer: player});
    }

})) 