export default class GameBoard {
  constructor(boardElement) {
    this.boardElement = boardElement;
    this.cells = [];
  }

  render() {
    this.boardElement.innerHTML = '';
    this.cells = [];

    for (let index = 0; index < 16; index += 1) {
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
    targetCell.append(goblin);
    targetCell.classList.add('active');
  }

  clearGoblin(position) {
    if (position === null) {
      return;
    }

    const targetCell = this.cells[position];
    if (targetCell) {
      targetCell.classList.remove('active');
      targetCell.innerHTML = '';
    }
  }
}
