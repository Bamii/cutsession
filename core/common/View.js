export default class View {
  constructor() {
    this.notifier = "";
    this.controller = null;
  }

  setController(controller) {
    this.controller = controller;
    this.controller.addView(this);
  }

  notify() {}
}
