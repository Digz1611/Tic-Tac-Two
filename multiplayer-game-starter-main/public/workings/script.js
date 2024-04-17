let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function handleCellClick(index) {
    if (!gameEnded && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementById(index).innerText = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameEnded = true;
        } else if (!board.includes('')) {
            alert("It's a tie!");
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winPatterns.some(pattern => pattern.every(index => board[index] === currentPlayer));
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}
