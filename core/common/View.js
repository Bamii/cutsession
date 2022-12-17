export default class View {
  constructor() {
    this.notifier = "";
    this.controller = null;
  }

  init(){}

  setController(controller) {
    this.controller = controller;
    this.controller.addView(this);
    this.init()
  }

  notify() {}
}
