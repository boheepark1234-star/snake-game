const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let gameOver = false;
let score = 0;
const restartBtn = document.getElementById('restartBtn');

function drawBoard() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    // Prevent food from spawning on the snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

function checkCollision() {
    const head = snake[0];
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver = true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = '#f00';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', 80, 200);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 150, 240);
        if (restartBtn) restartBtn.style.display = 'block';
        return;
    }
    drawBoard();
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
    drawScore();
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 'ArrowUp':
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 'ArrowRight':
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
        case 'ArrowDown':
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
    }
});

let interval = setInterval(gameLoop, 100);

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = { x: 15, y: 15 };
    gameOver = false;
    score = 0;
    if (restartBtn) restartBtn.style.display = 'none';
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        restartGame();
    });
}

interval = setInterval(gameLoop, 100);
