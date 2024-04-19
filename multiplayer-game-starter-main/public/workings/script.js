let clickCount = 0;
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];
let isWin = false;
let isTie = false;

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

  if (isWin || isTie) {
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

function displayResult() {
  if (isWin) {
    updateBoard();
    const symbol = clickCount % 2 === 0 ? 'X' : 'O';
    alert(`${symbol} wins!`);
  } else if (isTie) {
    updateBoard();
    alert('It\'s a tie!');
  }
}

function resetGame() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });
  board = ['', '', '', '', '', '', '', '', ''];
  clickCount = 0;
  isWin = false;
  isTie = false;
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});
















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
