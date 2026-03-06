export default class GameBoard {
  constructor(boardElement) {
    this.boardElement = boardElement;
    this.cells = [];
  }

  static get GRID_SIZE() {
    return 4;
  }

  static get CELL_COUNT() {
    return GameBoard.GRID_SIZE ** 2;
  }

  render() {
    this.boardElement.innerHTML = '';
    this.cells = [];

    for (let index = 0; index < GameBoard.CELL_COUNT; index += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = String(index);
      this.boardElement.append(cell);
      this.cells.push(cell);
    }

    return this.cells;
  }

  clearActiveState() {
    this.cells.forEach((cell) => cell.classList.remove('active'));
  }

  placeGoblin(goblin, position) {
    this.clearActiveState();
    const targetCell = this.cells[position];

    if (!targetCell) {
      return;
    }

    targetCell.innerHTML = '';
    targetCell.append(goblin);
    targetCell.classList.add('active');
  }

  clearGoblin(position) {
    if (position === null || !this.cells[position]) {
      return;
    }

    this.cells[position].innerHTML = '';
    this.cells[position].classList.remove('active');
  }
}
