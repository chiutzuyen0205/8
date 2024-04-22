let board = [];
let score = 0;

// Initialize the board
function initializeBoard() {
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    addNewTile();
    addNewTile();
    updateBoard();
}

// Add a new tile (either 2 or 4) to a random empty cell
function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Update the HTML board representation
function updateBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    board.forEach(row => {
        row.forEach(cell => {
            const tile = document.createElement('div');
            tile.className = 'tile tile-' + cell;
            tile.textContent = cell !== 0 ? cell : '';
            gameBoard.appendChild(tile);
        });
    });
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Restart the game
function restart() {
    score = 0;
    initializeBoard();
}

// Function to handle key presses
function handleKeyPress(event) {
    const key = event.key;
    let moved = false;

    switch (key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }

    if (moved) {
        addNewTile();
        updateBoard();
    }
}

// Move tiles up
function moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                let k = i - 1;
                while (k >= 0 && board[k][j] === 0) {
                    board[k][j] = board[k + 1][j];
                    board[k + 1][j] = 0;
                    k--;
                    moved = true;
                }
                if (k >= 0 && board[k][j] === board[k + 1][j]) {
                    board[k][j] *= 2;
                    score += board[k][j];
                    board[k + 1][j] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Move tiles down
function moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                let k = i + 1;
                while (k <= 3 && board[k][j] === 0) {
                    board[k][j] = board[k - 1][j];
                    board[k - 1][j] = 0;
                    k++;
                    moved = true;
                }
                if (k <= 3 && board[k][j] === board[k - 1][j]) {
                    board[k][j] *= 2;
                    score += board[k][j];
                    board[k - 1][j] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Move tiles left
function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                let k = j - 1;
                while (k >= 0 && board[i][k] === 0) {
                    board[i][k] = board[i][k + 1];
                    board[i][k + 1] = 0;
                    k--;
                    moved = true;
                }
                if (k >= 0 && board[i][k] === board[i][k + 1]) {
                    board[i][k] *= 2;
                    score += board[i][k];
                    board[i][k + 1] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Move tiles right
function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                let k = j + 1;
                while (k <= 3 && board[i][k] === 0) {
                    board[i][k] = board[i][k - 1];
                    board[i][k - 1] = 0;
                    k++;
                    moved = true;
                }
                if (k <= 3 && board[i][k] === board[i][k - 1]) {
                    board[i][k] *= 2;
                    score += board[i][k];
                    board[i][k - 1] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Initialize the game
initializeBoard();
document.addEventListener('keydown', handleKeyPress);