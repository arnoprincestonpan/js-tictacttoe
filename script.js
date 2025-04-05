console.log("Hello World!");

const container = document.getElementById("container");

let board = Array(9).fill(0); 
const cells = document.querySelectorAll('.cell');
let currentPlayer = 1;

const dummyBoard = [
    1, 2, 1,
    2, 2, 2,
    2, 1, 2
];

board = dummyBoard;

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
            alert(`win`);
        }
    }
};

renderBoard();
checkWinner();
