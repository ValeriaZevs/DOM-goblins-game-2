import GameBoard from './js/GameBoard';
import GameController from './js/GameController';

describe('GameBoard', () => {
  test('creates 16 cells for a 4x4 board', () => {
    document.body.innerHTML = '<div id="gameBoard"></div>';
    const board = new GameBoard(document.getElementById('gameBoard'));

    const cells = board.render();

    expect(cells).toHaveLength(16);
    expect(document.querySelectorAll('.cell')).toHaveLength(16);
  });

  test('returns random index different from excluded one', () => {
    document.body.innerHTML = '<div id="gameBoard"></div>';
    const board = new GameBoard(document.getElementById('gameBoard'));
    board.render();

    const nextIndex = board.getRandomCellIndex(3);

    expect(nextIndex).not.toBe(3);
    expect(nextIndex).toBeGreaterThanOrEqual(0);
    expect(nextIndex).toBeLessThan(16);
  });
});

describe('GameController', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main id="app">
        <p id="status"></p>
        <span id="score"></span>
        <span id="misses"></span>
        <button id="startBtn" type="button">Старт</button>
        <button id="resetBtn" type="button">Сброс</button>
        <div id="gameBoard"></div>
      </main>
    `;
  });

  test('increments score when goblin is hit', () => {
    const game = new GameController(document.getElementById('app'));
    game.init();

    game.showNextGoblin();
    const goblin = document.querySelector('.goblin');
    goblin.click();

    expect(document.getElementById('score').textContent).toBe('1');
  });

  test('ends game after 5 misses', () => {
    const game = new GameController(document.getElementById('app'));
    game.init();

    for (let i = 0; i < 6; i += 1) {
      game.showNextGoblin();
    }

    expect(document.getElementById('status').textContent).toContain('Игра окончена');
    expect(game.timerId).toBeNull();
  });
});
