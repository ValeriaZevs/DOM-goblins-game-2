import goblinImage from '../assets/goblin.png';
import GameBoard from './GameBoard';

export default class GoblinGame {
  constructor({
    board,
    scoreBoard,
    startButton,
    resetButton,
    tickMs = 1000,
    maxMisses = 5,
  }) {
    this.board = board;
    this.scoreBoard = scoreBoard;
    this.startButton = startButton;
    this.resetButton = resetButton;
    this.tickMs = tickMs;
    this.maxMisses = maxMisses;

    this.goblin = GoblinGame.createGoblin();
    this.timerId = null;
    this.currentPosition = null;
    this.score = 0;
    this.misses = 0;
    this.visible = false;

    this.handleGoblinClick = this.handleGoblinClick.bind(this);
    this.goblin.addEventListener('click', this.handleGoblinClick);
  }

  static getRandomPosition(excludePosition = null) {
    let position;
    do {
      position = Math.floor(Math.random() * GameBoard.CELL_COUNT);
    } while (excludePosition !== null && position === excludePosition);

    return position;
  }

  static createGoblin() {
    const goblin = document.createElement('img');
    goblin.src = goblinImage;
    goblin.className = 'goblin';
    goblin.alt = 'Goblin';
    return goblin;
  }

  handleGoblinClick() {
    if (!this.visible || !this.isRunning()) {
      return;
    }

    this.score += 1;
    this.visible = false;
    this.board.clearGoblin(this.currentPosition);
    this.render('Great hit!');
  }

  isRunning() {
    return this.timerId !== null;
  }

  start() {
    if (this.isRunning()) {
      return;
    }

    this.timerId = setInterval(() => this.tick(), this.tickMs);
    this.startButton.disabled = true;
    this.tick();
  }

  stop(status = 'Game stopped') {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.startButton.disabled = false;
    this.render(status);
