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
    this.previousPosition = null;
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
    this.currentPosition = null;
    this.render('Great hit!');
  }

@@ -62,67 +64,70 @@ export default class GoblinGame {

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
  }

  reset() {
    this.stop('Press Start to begin');
    this.board.clearGoblin(this.currentPosition);
    this.currentPosition = null;
    this.previousPosition = null;
    this.score = 0;
    this.misses = 0;
    this.visible = false;
    this.render('Press Start to begin');
  }

  tick() {
    if (this.visible) {
      this.misses += 1;
    }

    this.board.clearGoblin(this.currentPosition);

    if (this.misses >= this.maxMisses) {
      this.visible = false;
      this.currentPosition = null;
      this.previousPosition = null;
      this.stop(`Game over! Final score: ${this.score}`);
      return;
    }

    this.currentPosition = GoblinGame.getRandomPosition(this.previousPosition);
    this.previousPosition = this.currentPosition;
    this.board.placeGoblin(this.goblin, this.currentPosition);
    this.visible = true;
    this.render('Whack the goblin!');
  }

  render(status) {
    this.scoreBoard.update({
      score: this.score,
      misses: this.misses,
      status,
    });
  }

  mount() {
    this.board.render();
    this.render('Press Start to begin');

    this.startButton.addEventListener('click', () => this.start());
    this.resetButton.addEventListener('click', () => this.reset());
  }
}
