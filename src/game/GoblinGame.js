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
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

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

  mount() {
    this.board.render();
    this.startButton.addEventListener('click', this.handleStartClick);
    this.resetButton.addEventListener('click', this.handleResetClick);
    this.render('Press Start');
  }

  isRunning() {
    return this.timerId !== null;
  }

  handleStartClick() {
    this.start();
  }

  handleResetClick() {
    this.reset();
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
    this.visible = false;
    this.board.clearGoblin(this.currentPosition);
    this.currentPosition = null;
    this.render(status);
  }

  reset() {
    this.stop('Game reset');
    this.score = 0;
    this.misses = 0;
    this.render('Press Start');
  }

  tick() {
    if (this.visible) {
      this.misses += 1;

      if (this.misses >= this.maxMisses) {
        this.stop('Game over');
        return;
      }
    }

    const nextPosition = GoblinGame.getRandomPosition(this.currentPosition);
    this.currentPosition = nextPosition;
    this.visible = true;

    this.board.placeGoblin(this.goblin, nextPosition);
    this.render('Catch the goblin!');
  }

  render(status = 'Ready') {
    this.scoreBoard.update({
      score: this.score,
      misses: this.misses,
      status,
    });
  }
}
