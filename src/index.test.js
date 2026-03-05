import GameBoard from './game/GameBoard';
import GoblinGame from './game/GoblinGame';

describe('GameBoard', () => {
  test('creates 16 cells for a 4x4 board', () => {
    document.body.innerHTML = '<div id="gameBoard"></div>';
    const board = new GameBoard(document.getElementById('gameBoard'));

    const cells = board.render();

    expect(cells).toHaveLength(GameBoard.CELL_COUNT);
    expect(document.querySelectorAll('.cell')).toHaveLength(GameBoard.CELL_COUNT);
  });

  test('places and clears goblin in selected cell', () => {
    document.body.innerHTML = '<div id="gameBoard"></div>';
    const board = new GameBoard(document.getElementById('gameBoard'));
    board.render();

    const goblin = document.createElement('img');
    board.placeGoblin(goblin, 3);

    expect(board.cells[3].querySelector('img')).not.toBeNull();
    expect(board.cells[3].classList.contains('active')).toBe(true);

    board.clearGoblin(3);
    expect(board.cells[3].querySelector('img')).toBeNull();
    expect(board.cells[3].classList.contains('active')).toBe(false);
  });
});

describe('GoblinGame', () => {
  test('returns random position different from excluded one', () => {
    const nextIndex = GoblinGame.getRandomPosition(3);

    expect(nextIndex).not.toBe(3);
    expect(nextIndex).toBeGreaterThanOrEqual(0);
    expect(nextIndex).toBeLessThan(GameBoard.CELL_COUNT);
  });



  test('does not spawn goblin in the same cell twice in a row', () => {
    const board = {
      clearGoblin: jest.fn(),
      placeGoblin: jest.fn(),
      render: jest.fn(),
    };
    const scoreBoard = { update: jest.fn() };
    const startButton = { disabled: false };
    const resetButton = { addEventListener: jest.fn() };

    const game = new GoblinGame({
      board,
      scoreBoard,
      startButton,
      resetButton,
    });

    const randomSpy = jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.2);

    game.tick();
    const firstPosition = game.currentPosition;

    game.visible = false;
    game.tick();

    expect(game.currentPosition).not.toBe(firstPosition);

    randomSpy.mockRestore();
  });

  test('creates goblin image element', () => {
    const goblin = GoblinGame.createGoblin();

    expect(goblin.tagName).toBe('IMG');
    expect(goblin.classList.contains('goblin')).toBe(true);
    expect(goblin.alt).toBe('Goblin');
  });
});
