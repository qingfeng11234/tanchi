const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('bestScore');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('startBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
const speed = 115;

let snake;
let direction;
let nextDirection;
let food;
let score;
let bestScore;
let timer;
let gameOver;

function loadBestScore() {
  const value = Number(localStorage.getItem('snake_best_score') || 0);
  bestScore = Number.isFinite(value) ? value : 0;
  bestScoreEl.textContent = String(bestScore);
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function placeFood() {
  let candidate = randomCell();
  while (snake.some((segment) => segment.x === candidate.x && segment.y === candidate.y)) {
    candidate = randomCell();
  }
  food = candidate;
}

function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  gameOver = false;
  scoreEl.textContent = '0';
  placeFood();
  statusEl.textContent = '游戏进行中…';
}

function drawGrid() {
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 1;
  for (let i = 0; i <= tileCount; i += 1) {
    const pos = i * gridSize;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(canvas.width, pos);
    ctx.stroke();
  }
}

function drawFood() {
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2.5,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#16a34a' : '#22c55e';
    const padding = index === 0 ? 2 : 3;
    ctx.fillRect(
      segment.x * gridSize + padding,
      segment.y * gridSize + padding,
      gridSize - padding * 2,
      gridSize - padding * 2,
    );
  });
}

function update() {
  if (gameOver) return;

  direction = nextDirection;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  const hitWall = head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount;
  const hitSelf = snake.some((segment) => segment.x === head.x && segment.y === head.y);

  if (hitWall || hitSelf) {
    gameOver = true;
    statusEl.textContent = `游戏结束！得分：${score}`;
    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem('snake_best_score', String(bestScore));
      bestScoreEl.textContent = String(bestScore);
    }
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreEl.textContent = String(score);
    placeFood();
  } else {
    snake.pop();
  }
}

function render() {
  drawGrid();
  drawFood();
  drawSnake();
}

function gameLoop() {
  update();
  render();
}

function changeDirection(key) {
  const map = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
    W: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    A: { x: -1, y: 0 },
    D: { x: 1, y: 0 },
  };

  const desired = map[key];
  if (!desired) return;

  const isReverse = desired.x === -direction.x && desired.y === -direction.y;
  if (!isReverse) {
    nextDirection = desired;
  }
}

window.addEventListener('keydown', (event) => {
  changeDirection(event.key);
});

startBtn.addEventListener('click', () => {
  resetGame();
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(gameLoop, speed);
  render();
});

loadBestScore();
render();
