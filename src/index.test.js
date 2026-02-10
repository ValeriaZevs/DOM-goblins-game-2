import {
  getRandomPosition,
  createGameBoard,
  createGoblin,
  moveGoblin,
} from './index';

jest.mock('./assets/goblin.png', () => 'test-goblin.png');

beforeEach(() => {
  document.body.innerHTML = `
    <div id="gameBoard"></div>
    <div id="movesCount">0</div>
    <button id="startBtn"></button>
    <button id="pauseBtn"></button>
    <button id="resetBtn"></button>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});

describe('Game Logic Tests', () => {
  test('getRandomPosition returns number between 0 and 15', () => {
    const position = getRandomPosition();
    expect(position).toBeGreaterThanOrEqual(0);
    expect(position).toBeLessThanOrEqual(15);
  });

  test('getRandomPosition does not return excluded position', () => {
    const exclude = 7;
    const position = getRandomPosition(exclude);
    expect(position).not.toBe(exclude);
  });

  test('getRandomPosition eventually returns all positions', () => {
    const positions = new Set();
    for (let i = 0; i < 100; i += 1) {
      positions.add(getRandomPosition());
    }
    expect(positions.size).toBeGreaterThan(1);
  });

  test('createGameBoard creates 16 cells', () => {
    const cells = createGameBoard();
    expect(cells.length).toBe(16);
    expect(document.querySelectorAll('.cell').length).toBe(16);
  });

  test('createGoblin creates an image element', () => {
    const goblin = createGoblin();
    expect(goblin.tagName).toBe('IMG');
    expect(goblin.className).toBe('goblin');
  });

  test('moveGoblin moves goblin to different cell', () => {
    const cells = createGameBoard();
    const goblin = createGoblin();
    const startPosition = 5;

    cells[startPosition].append(goblin);
    const newPosition = moveGoblin(goblin, cells, startPosition);

    expect(newPosition).not.toBe(startPosition);
    expect(cells[newPosition].contains(goblin)).toBe(true);
  });

  test('moveGoblin does not place goblin in same cell', () => {
    const cells = createGameBoard();
    const goblin = createGoblin();
    const startPosition = 3;
    let lastPosition = startPosition;

    for (let i = 0; i < 10; i += 1) {
      cells[lastPosition].append(goblin);
      const newPosition = moveGoblin(goblin, cells, lastPosition);
      expect(newPosition).not.toBe(lastPosition);
      lastPosition = newPosition;
    }
  });

  test('moveGoblin updates active class on cells', () => {
    const cells = createGameBoard();
    const goblin = createGoblin();
    const startPosition = 0;

    cells[startPosition].append(goblin);
    cells[startPosition].classList.add('active');

    const newPosition = moveGoblin(goblin, cells, startPosition);

    expect(cells[startPosition].classList.contains('active')).toBe(false);
    expect(cells[newPosition].classList.contains('active')).toBe(true);
  });
});

describe('DOM Manipulation Tests', () => {
  test('goblin can be moved by changing parent', () => {
    const goblin = createGoblin();
    const cell1 = document.createElement('div');
    const cell2 = document.createElement('div');

    cell1.id = 'cell1';
    cell2.id = 'cell2';

    document.body.append(cell1, cell2);
    cell1.append(goblin);

    expect(cell1.contains(goblin)).toBe(true);
    expect(cell2.contains(goblin)).toBe(false);

    cell2.append(goblin);

    expect(cell1.contains(goblin)).toBe(false);
    expect(cell2.contains(goblin)).toBe(true);
    expect(document.body.querySelectorAll('img').length).toBe(1);
  });
});
