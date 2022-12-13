export default class Block {
  constructor(element) {
    this.element = element;
  }

  setText(text) {
    this.element.textContent = text;
  }
}
