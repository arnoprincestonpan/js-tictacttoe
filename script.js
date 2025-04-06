console.log("Hello World!");

const container = document.getElementById("container");
const status = document.getElementById("status");
const resetGame = document.getElementById("reset");

resetGame.addEventListener('click', () => {
    resetBoard();
    console.log("Reset Game");
});

let board = Array(9).fill(0); 
const cells = document.querySelectorAll('.cell');
let currentPlayer = 1;
let gameEnd = false;

const dummyBoard = [
    1, 2, 1,
    2, 1, 2,
    2, 1, 2
];

board = dummyBoard;

const resetBoard = () => {
    board = Array(9).fill(0);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick);
        cell.classList.remove('winner');
    });
    currentPlayer
    gameEnd = false;
    status.textContent = "Current Player: X";
    renderBoard();
}

const renderBoard = () => {
    cells.forEach((cell, index) => {
        if(board[index] === 1) {
            cell.textContent = "X";
        }
        else if(board[index] === 2) {
            cell.textContent = "O";
        }
        else {
            cell.textContent = "";
        }
    })
}

const checkWinner = () => {
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

    for(let combinations of winningCombinations){
        const [a, b, c] = combinations;
        if(board[a] != 0 && board[a] === board[b] && board[b] === board[c]){
            console.log(`Win detected!`);
            gameEnd = true;
            alert(`win`);
        }
    }

    if(!board.includes(0)){
        gameEnd = true;
        alert("It's a draw!");
    }
};

const highlightWinningCells = (winningCombination) => {
    winningCombination.forEach(index => {
        cells[index].classList.add('winner'); // You'll need to define CSS for the 'winner' class
    });
};

const handleCellClick = (event) => {
    if (gameEnd || currentPlayer !== 1) {
        return; // Ignore clicks if the game is over or it's not the player's turn
    }

    const clickedCellIndex = parseInt(event.target.dataset.index); // Assuming you add 'data-index' to your cells

    if (board[clickedCellIndex] === 0) {
        board[clickedCellIndex] = currentPlayer;
        renderBoard();
        const winner = checkWinner();
        if (!gameEnd) {
            currentPlayer = 2; // Switch to computer's turn
            status.textContent = "Computer's Turn (O)";
            setTimeout(computerMove, 500); // Add a slight delay for the computer's move
        }
    }
};

const computerMove = () => {
    if (gameEnd || currentPlayer !== 2) {
        return;
    }

    // Basic AI: Find the first empty cell
    const emptyCells = board.reduce((acc, val, index) => {
        if (val === 0) {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMoveIndex = emptyCells[randomIndex];
        board[computerMoveIndex] = currentPlayer;
        renderBoard();
        const winner = checkWinner();
        if (!gameEnd) {
            currentPlayer = 1; // Switch back to player's turn
            status.textContent = "Player's Turn (X)";
        }
    }
};

const startGame = () => {
    resetBoard();
};

// Initialize the game when the script loads
startGame();

// Add event listeners to the cells
cells.forEach((cell, index) => {
    cell.dataset.index = index; // Add a data attribute to identify the cell
    cell.addEventListener('click', handleCellClick);
});

