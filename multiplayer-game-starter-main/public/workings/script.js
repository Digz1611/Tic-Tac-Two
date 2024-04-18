let clickCount = 0;

function handleClick(event) {
    const cell = event.target;
    if (clickCount % 2 === 0) {
        cell.textContent = 'x';
    } else {
        cell.textContent = 'o';
    }
    clickCount++;
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
    // Reset any game-related variables
    // For example, reset clickCount to 0
    clickCount = 0;
}
