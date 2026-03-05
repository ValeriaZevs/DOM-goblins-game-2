export default class ScoreBoard {
  constructor(scoreElement, missElement, statusElement) {
    this.scoreElement = scoreElement;
    this.missElement = missElement;
    this.statusElement = statusElement;
  }

  update({ score, misses, status }) {
    this.scoreElement.textContent = String(score);
    this.missElement.textContent = String(misses);
    this.statusElement.textContent = status;
  }
}
