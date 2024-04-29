// Initialize Socket.IO connection
const socket = io();

// Initialize variables
let clickCount = 0; // Tracks the number of clicks
let board = ['', '', '', '', '', '', '', '', '']; // Represents the tic-tac-toe board
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];
let isWin = false; // Flag to track if a player has won

let playerXScore = 0; // Player X's score
let playerOScore = 0; // Player O's score

// Function to handle cell click
function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.id) - 1;

  // If the cell is already occupied, show an alert and return
  if (board[cellIndex] !== '') {
    alert('Cell is already occupied!');
    return;
  }

  // Determine the current player's symbol (X or O)
  const symbol = clickCount % 2 === 0 ? 'X' : 'O';
  // Update the board and UI with the current symbol
  board[cellIndex] = symbol;
  cell.textContent = symbol;
  clickCount++;

  // Check if the current player has won
  isWin = checkWin(symbol);

  // Update the board UI
  updateBoard();

  // If the game is won, highlight the winning cells, update the score, and reset the game after 5 seconds
  if (isWin) {
    highlightWinningCells(symbol);
    updateScore(symbol);
    setTimeout(resetGame, 5000);
  } 
}

// Function to check if a player has won
function checkWin(symbol) {
  // Check if any winning combination is met
  return winningCombos.some(combo => {
    // Check if every index in a winning combo contains the current player's symbol
    return combo.every(index => board[index] === symbol);
  });
}

// Function to update the board UI
function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  // Update each cell's text content based on the current state of the board
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Function to reset the game
function resetGame() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = 'rgb(107, 32, 255)';
    cell.style.color = 'white';
  });
  board = ['', '', '', '', '', '', '', '', ''];
  clickCount = 0;
  isWin = false;
}

//remove oldest
function removeOldest() {
  if (clickCount === 6) {
    alert('test!');
  }
}

// Function to highlight the winning cells
function highlightWinningCells(symbol) {
  const winningCombo = winningCombos.find(combo =>
    combo.every(index => board[index] === symbol)
  );

  if (winningCombo) {
    winningCombo.forEach(index => {
      const cell = document.getElementById(`${index + 1}`);
      cell.style.backgroundColor = 'rgb(32, 255, 117)';
    });
  }
}

// Function to update the score
function updateScore(symbol) {
  if (symbol === 'X') {
    playerXScore++;
    document.getElementById('playerXScore').textContent = playerXScore;
  } else {
    playerOScore++;
    document.getElementById('playerOScore').textContent = playerOScore;
  }
}

// Add event listeners to each cell for click events
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Add event listener to the reset button to reset the game
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);