export default class HandleButtonClick {
  constructor({ selector }) {
    this.button = this.getButton(selector);
  }

  getButton(selector) {
    const button = document.querySelector(selector);
    return button;
  }

  add() {
    this.button.dataset.action = 'remove';
    this.button.classList.add('--accent-button');
  }

  remove() {
    this.button.dataset.action = 'add';
    this.button.classList.remove('--accent-button');
  }
}
