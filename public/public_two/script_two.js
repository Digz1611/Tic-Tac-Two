// // Initialize variables
// let clickCount = 0; // Tracks the number of clicks
// let board = ['', '', '', '', '', '', '', '', '']; // Represents the tic-tac-toe board
// const winningCombos = [
//   [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
//   [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
//   [0, 4, 8], [2, 4, 6] // Diagonal
// ];
// let isWin = false; // Flag to track if a player has won

// let playerXScore = 3; // Player X's score
// let playerOScore = 3; // Player O's score

// // Queue to keep track of clicked cell indices
// let clickedCells = [];

// // Function to handle cell click
// function handleClick(event) {
//   const cell = event.target;
//   const cellIndex = parseInt(cell.id) - 1;

//   // If the cell is already occupied, show an alert and return
//   if (board[cellIndex] !== '') {
//     alert('Cell is already occupied!');
//     return;
//   }

//   // Remove oldest cell if number of cells on board exceeds 6
//   if (clickCount >= 6) {
//     removeOldest();
//     highlightOldest();
//   }

//   // Determine the current player's symbol (X or O)
//   const symbol = clickCount % 2 === 0 ? 'X' : 'O';
//   // Update the board and UI with the current symbol
//   board[cellIndex] = symbol;
//   cell.textContent = symbol;
//   clickCount++;

//   // Add the clicked cell index to the queue
//   clickedCells.push(cellIndex);

//   // Check if the current player has won
//   isWin = checkWin(symbol);

//   // Update the board UI
//   updateBoard();

//   // If the game is won, highlight the winning cells, update the score, and reset the game after 5 seconds
//   if (isWin) {
//     highlightWinningCells(symbol);
//     updateScore(symbol);
//     setTimeout(resetGame, 1000);
//   } 
// }

// // Function to check if a player has won
// function checkWin(symbol) {
//   // Check if any winning combination is met
//   return winningCombos.some(combo => {
//     // Check if every index in a winning combo contains the current player's symbol
//     return combo.every(index => board[index] === symbol);
//   });
// }

// // Function to update the board UI
// function updateBoard() {
//   const cells = document.querySelectorAll('.cell');
//   // Update each cell's text content based on the current state of the board
//   cells.forEach((cell, index) => {
//     cell.textContent = board[index];
//   });
// }

// // Function to reset the game
// function resetGame() {
//   const cells = document.querySelectorAll('.cell');
//   cells.forEach(cell => {
//     cell.textContent = '';
//     cell.style.backgroundColor = 'rgb(107, 32, 255)';
//     cell.style.color = 'white';
//   });
//   board = ['', '', '', '', '', '', '', '', ''];
//   clickCount = 0;
//   isWin = false;
//   clickedCells = [];
// }

// // Function to highlight the winning cells
// function highlightWinningCells(symbol) {
//   const winningCombo = winningCombos.find(combo =>
//     combo.every(index => board[index] === symbol)
//   );

//   if (winningCombo) {
//     winningCombo.forEach(index => {
//       const cell = document.getElementById(`${index + 1}`);
//       cell.style.backgroundColor = 'rgb(32, 255, 117)';
//     });
//   }
// }

// // Function to update the score
// function updateScore(symbol) {
//   if (symbol === 'X') {
//     playerXScore--;
//     document.getElementById('playerXScore').textContent = playerXScore;
//   } else {
//     playerOScore--;
//     document.getElementById('playerOScore').textContent = playerOScore;
//   }
// }

// // Function to decide the winner
// function determineWinner(symbol) {
//   if (symbol === 'X') {
//     playerXScore === 0;
//     alert('Player' + symbol + 'WINS!!!!' );
//   } else {
//     playerOScore === 0;
//     alert('Player' + symbol + 'WINS!!!!' );
//   }
// }

// // Function to remove the oldest cell
// function removeOldest() {
//   const oldestCellIndex = clickedCells.shift(); //not same
//   if (oldestCellIndex !== undefined) {
//     board[oldestCellIndex] = '';
//     const oldestCell = document.getElementById(`${oldestCellIndex + 1}`);
//     oldestCell.textContent = '';
//     oldestCell.style.color = 'white'; 
//   }
// }

// // Function to highlight the oldest cell
// function highlightOldest() {
//   const oldestCellIndex = clickedCells[0];
//   if (oldestCellIndex !== undefined) {
//     const oldestCell = document.getElementById(`${oldestCellIndex + 1}`);
//     oldestCell.style.color = 'rgba(255, 255, 255, 0.75)'; // Change colour
//   }
// }

// // Add event listeners to each cell for click events
// const cells = document.querySelectorAll('.cell');
// cells.forEach(cell => {
//   cell.addEventListener('click', handleClick);
// });

// // Add event listener to the again button to again the game
// const againButton = document.getElementById('againButton');
// againButton.addEventListener('click', resetGame);

// Initialize variables
let clickCount = 0;
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
let isWin = false;

let playerXScore = 3;
let playerOScore = 3;

let clickedCells = [];

// Function to handle cell click
function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.id) - 1;

  // If the cell is already occupied, show an alert and return
  if (board[cellIndex] !== '') {
    alert('Cell is already occupied!');
    return;
  }

  // Remove oldest cell if number of cells on board exceeds 6
  if (clickCount >= 6) {
    removeOldest();
    highlightOldest();
  }

  // Determine the current player's symbol (X or O)
  const symbol = clickCount % 2 === 0 ? 'X' : 'O';
  // Update the board and UI with the current symbol
  board[cellIndex] = symbol;
  cell.textContent = symbol;
  clickCount++;

  // Add the clicked cell index to the queue
  clickedCells.push(cellIndex);

  // Check if the current player has won
  isWin = checkWin(symbol);

  // Update the board UI
  updateBoard();

  // If the game is won, highlight the winning cells, update the score, and reset the game after 5 seconds
  if (isWin) {
    highlightWinningCells(symbol);
    updateScore(symbol);
    setTimeout(resetGame, 1000);
  }
}

// Function to check if a player has won
function checkWin(symbol) {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === symbol);
  });
}

// Function to update the board UI
function updateBoard() {
  const cells = document.querySelectorAll('.cell');
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
  clickedCells = [];
  updateScoreDisplay('X', 3);
  updateScoreDisplay('O', 3);
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
    playerXScore--;
    updateScoreDisplay('X', playerXScore);
    if (playerXScore === 0) {
      determineWinner(symbol);
    }
  } else {
    playerOScore--;
    updateScoreDisplay('O', playerOScore);
    if (playerOScore === 0) {
      determineWinner(symbol);
    }
  }
}

// Function to update the score display
function updateScoreDisplay(symbol, score) {
  const scoreContainer = symbol === 'X' ? document.getElementById('playerXScore') : document.getElementById('playerOScore');
  scoreContainer.innerHTML = '';

  for (let i = 0; i < score; i++) {
    const heart = document.createElement('img');
    heart.src = '../8-bit_life.png';
    scoreContainer.appendChild(heart);
  }
}

// Function to decide the winner
function determineWinner(symbol) {
  alert('Player ' + symbol + ' WINS!!!!');
}

// Function to remove the oldest cell
function removeOldest() {
  const oldestCellIndex = clickedCells.shift();
  if (oldestCellIndex !== undefined) {
    board[oldestCellIndex] = '';
    const oldestCell = document.getElementById(`${oldestCellIndex + 1}`);
    oldestCell.textContent = '';
    oldestCell.style.color = 'white';
  }
}

// Function to highlight the oldest cell
function highlightOldest() {
  const oldestCellIndex = clickedCells[0];
  if (oldestCellIndex !== undefined) {
    const oldestCell = document.getElementById(`${oldestCellIndex + 1}`);
    oldestCell.style.color = 'rgba(255, 255, 255, 0.75)';
  }
}

// Add event listeners to each cell for click events
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Add event listener to the again button to reset the game
const againButton = document.getElementById('againButton');
againButton.addEventListener('click', resetGame);