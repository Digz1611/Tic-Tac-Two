let clickCount = 0;
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];
let isWin = false;
let isTie = false;
let playerXScore = 0;
let playerOScore = 0;

function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.id) - 1;

  if (board[cellIndex] !== '') {
    alert('Cell is already occupied!');
    return;
  }

  const symbol = clickCount % 2 === 0 ? 'X' : 'O';
  board[cellIndex] = symbol;
  cell.textContent = symbol;
  clickCount++;

  isWin = checkWin(symbol);
  isTie = !isWin && clickCount === 9;

  updateBoard();

  if (isWin) {
    highlightWinningCells(symbol);
    updateScore(symbol);
    setTimeout(resetGame, 5000);
  } else if (isTie) {
    displayResult();
    resetGame();
  }
}

function checkWin(symbol) {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === symbol);
  });
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

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
  isTie = false;
}
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

function updateScore(symbol) {
  if (symbol === 'X') {
    playerXScore++;
    document.getElementById('playerXScore').textContent = playerXScore;
  } else {
    playerOScore++;
    document.getElementById('playerOScore').textContent = playerOScore;
  }
}

function displayResult() {
  alert('It\'s a tie!');
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);















// let clickCount = 0;

// let x = "";
// let o = "";

// function handleClick(event) {
//     const cell = event.target;
//     if (cell.textContent !== '') {
//       alert('Cell is already occupied!');
//       return;
//     }
    
//     if (clickCount % 2 === 0) {
//       cell.textContent = 'x';
//     } else {
//       cell.textContent = 'o';
//     }
//     clickCount++;
//   }

// const cells = document.querySelectorAll('.cell');
// cells.forEach(cell => {
//     cell.addEventListener('click', handleClick);
// });

// function resetGame() {
//     const cells = document.querySelectorAll('.cell');
//     cells.forEach(cell => {
//         cell.textContent = '';
//     });
//     // Reset any game-related variables
//     // For example, reset clickCount to 0
//     clickCount = 0;
// }
