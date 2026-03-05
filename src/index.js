import './styles/style.css';
import GameBoard from './game/GameBoard';
import ScoreBoard from './game/ScoreBoard';
import GoblinGame from './game/GoblinGame';

function getRandomPosition(excludePosition = null) {
  return GoblinGame.getRandomPosition(excludePosition);
}

function createGameBoard() {
  const gameBoardElement = document.getElementById('gameBoard');
  const board = new GameBoard(gameBoardElement);
  return board.render();
}

function createGoblin() {
  return GoblinGame.createGoblin();
}

function moveGoblin(goblin, cells, currentPosition) {
  const nextPosition = getRandomPosition(currentPosition);

  if (currentPosition !== null && cells[currentPosition]) {
    cells[currentPosition].classList.remove('active');
    cells[currentPosition].innerHTML = '';
  }

  cells[nextPosition].append(goblin);
  cells[nextPosition].classList.add('active');

  return nextPosition;
}

function initGame() {
  const board = new GameBoard(document.getElementById('gameBoard'));
  const scoreBoard = new ScoreBoard(
    document.getElementById('scoreCount'),
    document.getElementById('missCount'),
    document.getElementById('gameStatus'),
  );

  const game = new GoblinGame({
    board,
    scoreBoard,
    startButton: document.getElementById('startBtn'),
    resetButton: document.getElementById('resetBtn'),
  });

  game.mount();
  return game;
}

export {
  GameBoard,
  ScoreBoard,
  GoblinGame,
  getRandomPosition,
  createGameBoard,
  createGoblin,
  moveGoblin,
  initGame,
};

if (typeof jest === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
}
