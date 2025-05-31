function CreateBoard() {
    return Array(9).fill('');
}


function getBestMove(boardState, player, level) {
    let bestScore = -Infinity;
    let move = [];
    for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
            boardState[i] = player;
            let score = minimax(boardState, 0, false);
            boardState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move.push(i);
            }
        }
    }


    // condition base on level
    if(move.length == 0) return null;

    if(level == 'easy'){
        return move[0];

    }else if(level == 'medium') {
        return move[Math.floor(Math.random()*move.length)];

    }else {
        return move[move.length-1];
    }
}

function minimax(state, depth, isMaximizing) {
    if (checkWinner(state, 'O')) return 10 - depth;
    if (checkWinner(state, 'X')) return depth - 10;
    if (isDraw(state)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'O';
                best = Math.max(best, minimax(state, depth + 1, false));
                state[i] = '';
            }

        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'X';
                best = Math.min(best, minimax(state, depth + 1, true));
                state[i] = '';
            }
        }
        return best;
    }
}

function checkWinner(state, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(i => state[i] === player));
}

function isDraw(state) {
    return state.every(cell => cell !== '');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export { CreateBoard, getBestMove, checkWinner, delay };