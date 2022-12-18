import Notification from "../components/notification";
export default class View {
  constructor() {
    this.notifier = new Notification({
      selector: "notification",
      events: {
        close: {
          onclick: (e, component) => {
            component.close();
          }
        }
      }
    });
    this.controller = null;
  }

  init(){}

  setController(controller) {
    this.controller = controller;
    this.controller.addView(this);
    this.init()
  }

  notify(message) {
    this.notifier.notify(message);
  }

  unnotify() {
    this.notifier.close();
  }
}
