console.log("Hello World!");

const container = document.getElementById("container");

let board = Array(9).fill(0); 
const cells = document.querySelectorAll('.cell');
let currentPlayer = 1;

const dummyBoard = [
    1, 2, 1,
    2, 1, 2,
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
renderBoard();
