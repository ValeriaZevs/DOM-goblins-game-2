import './styles/style.css';
import goblinImage from './assets/goblin.png';

const GameState = {
  intervalId: null,
  currentPosition: null,
  isRunning: false,
  moveInterval: 2000,
  movesCount: 0,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(excludePosition = null) {
  let newPosition;
  const totalCells = 16;

  if (excludePosition === null) {
    newPosition = getRandomInt(0, totalCells - 1);
  } else {
    do {
      newPosition = getRandomInt(0, totalCells - 1);
    } while (newPosition === excludePosition);
  }

  return newPosition;
}

function createGameBoard() {
  const gameBoard = document.getElementById('gameBoard');

  gameBoard.innerHTML = '';

  for (let i = 0; i < 16; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.dataset.row = Math.floor(i / 4) + 1;
    cell.dataset.col = (i % 4) + 1;

    const cellNumber = document.createElement('span');
    cellNumber.className = 'cell-number';
    cellNumber.textContent = i + 1;
    cellNumber.style.cssText = `
      position: absolute;
      top: 5px;
      left: 5px;
      font-size: 12px;
      color: #999;
      font-weight: bold;
    `;

    cell.append(cellNumber);
    gameBoard.append(cell);
  }

  return document.querySelectorAll('.cell');
}

function createGoblin() {
  const goblin = document.createElement('img');
  goblin.src = goblinImage;
  goblin.className = 'goblin';
  goblin.alt = 'Mischievous goblin';
  goblin.title = 'Click me if you can!';

  goblin.addEventListener('click', () => {
    console.log('Goblin clicked! Score functionality coming soon...');
  });

  return goblin;
}

function moveGoblin(goblin, cells, currentPosition) {
  if (currentPosition !== null && cells[currentPosition]) {
    cells[currentPosition].classList.remove('active');
  }

  const newPosition = getRandomPosition(currentPosition);

  cells[newPosition].append(goblin);

  cells[newPosition].classList.add('active');

  GameState.movesCount += 1;
  updateMovesCount();

  console.log(`Goblin moved from cell ${currentPosition !== null ? currentPosition + 1 : 'start'} to cell ${newPosition + 1}`);

  return newPosition;
}

function updateMovesCount() {
  const movesElement = document.getElementById('movesCount');
  if (movesElement) {
    movesElement.textContent = GameState.movesCount;

    movesElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
      movesElement.style.transform = 'scale(1)';
    }, 300);
  }
}

function startGame() {
  if (GameState.isRunning) return;

  console.log('Starting game...');
  GameState.isRunning = true;

  const cells = document.querySelectorAll('.cell');
  const goblin = document.querySelector('.goblin') || createGoblin();

  if (GameState.currentPosition === null) {
    GameState.currentPosition = getRandomPosition();
    cells[GameState.currentPosition].append(goblin);
    cells[GameState.currentPosition].classList.add('active');
  }

  GameState.intervalId = setInterval(() => {
    GameState.currentPosition = moveGoblin(goblin, cells, GameState.currentPosition);
  }, GameState.moveInterval);

  updateButtonStates();
}

function pauseGame() {
  if (!GameState.isRunning) return;

  console.log('Pausing game...');
  GameState.isRunning = false;

  if (GameState.intervalId) {
    clearInterval(GameState.intervalId);
    GameState.intervalId = null;
  }

  updateButtonStates();
}

function resetGame() {
  console.log('Resetting game...');

  if (GameState.intervalId) {
    clearInterval(GameState.intervalId);
    GameState.intervalId = null;
  }

  GameState.currentPosition = null;
  GameState.isRunning = false;
  GameState.movesCount = 0;

  updateMovesCount();

  const cells = createGameBoard();
  const goblin = createGoblin();

  GameState.currentPosition = getRandomPosition();
  cells[GameState.currentPosition].append(goblin);
  cells[GameState.currentPosition].classList.add('active');

  updateButtonStates();
}

function changeSpeed(factor) {
  const newInterval = Math.max(500, Math.min(5000, GameState.moveInterval * factor));

  if (GameState.isRunning) {
    pauseGame();
    GameState.moveInterval = newInterval;
    startGame();
  } else {
    GameState.moveInterval = newInterval;
  }

  console.log(`Speed changed to ${GameState.moveInterval}ms`);
}

function updateButtonStates() {
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');

  if (GameState.isRunning) {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Game Running';
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  } else {
    startBtn.disabled = false;
    pauseBtn.disabled = GameState.currentPosition === null;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start Game';
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  }
}

function initGame() {
  console.log('Initializing game...');

  const cells = createGameBoard();
  const goblin = createGoblin();

  GameState.currentPosition = getRandomPosition();
  cells[GameState.currentPosition].append(goblin);
  cells[GameState.currentPosition].classList.add('active');

  setupEventListeners();

  updateButtonStates();

  console.log('Game initialized! Goblin is in cell', GameState.currentPosition + 1);
}

function setupEventListeners() {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }

  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', pauseGame);
  }

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
  }

  const speedUpBtn = document.getElementById('speedUp');
  if (speedUpBtn) {
    speedUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeSpeed(0.7);
    });
  }

  const speedDownBtn = document.getElementById('speedDown');
  if (speedDownBtn) {
    speedDownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeSpeed(1.3);
    });
  }

  const toggleSoundBtn = document.getElementById('toggleSound');
  if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const soundBtn = e.target.closest('a');
      const isOn = soundBtn.innerHTML.includes('On');
      soundBtn.innerHTML = isOn
        ? '<i class="fas fa-volume-mute"></i> Sound Off'
        : '<i class="fas fa-volume-up"></i> Sound On';
      console.log(`Sound turned ${isOn ? 'off' : 'on'}`);
    });
  }

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === ' ' || key === 'spacebar') {
      e.preventDefault();
      if (GameState.isRunning) {
        pauseGame();
      } else {
        startGame();
      }
    } else if (key === 'r' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      resetGame();
    } else if (key === '+' || key === '=') {
      e.preventDefault();
      changeSpeed(0.7);
    } else if (key === '-' || key === '_') {
      e.preventDefault();
      changeSpeed(1.3);
    }
  });
}

export {
  getRandomPosition,
  createGameBoard,
  createGoblin,
  moveGoblin,
  startGame,
  pauseGame,
  resetGame,
  initGame,
};

if (typeof jest === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
}
