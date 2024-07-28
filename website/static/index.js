let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(index) {
    if (gameState[index] === "" && currentPlayer === 'X') {
        gameState[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else if (!gameState.includes("")) {
            alert("It's a draw!");
            resetGame();
        } else {
            currentPlayer = 'O';
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    let bestMove = minimax(gameState, 'O').index;
    gameState[bestMove] = currentPlayer;
    document.getElementById(`cell-${bestMove}`).innerText = currentPlayer;
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        resetGame();
    } else if (!gameState.includes("")) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => gameState[index] === currentPlayer)
    );
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");
    currentPlayer = 'X';
}

function minimax(newGameState, player) {
    let emptyIndices = newGameState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

    if (winningCombinations.some(combination => 
        combination.every(index => newGameState[index] === 'X')
    )) {
        return { score: -10 };
    } else if (winningCombinations.some(combination => 
        combination.every(index => newGameState[index] === 'O')
    )) {
        return { score: 10 };
    } else if (emptyIndices.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let index of emptyIndices) {
        let move = { index };
        newGameState[index] = player;

        let result = minimax(newGameState, player === 'O' ? 'X' : 'O');
        move.score = result.score;

        newGameState[index] = "";
        moves.push(move);
    }

    let bestMove = moves[0];
    if (player === 'O') {
        bestMove = moves.reduce((best, move) => move.score > best.score ? move : best, bestMove);
    } else {
        bestMove = moves.reduce((best, move) => move.score < best.score ? move : best, bestMove);
    }

    return bestMove;
}
