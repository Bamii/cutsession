import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import SessionListItem from "../../components/session-list-item";
import Header from "../../components/header";
import { parseQuery } from "../../../utils";
import Nav from "../../components/nav";

class WidgetView extends View {
  constructor() {
    super();
    this.table = document.querySelector("[data-table]");
    // probably optimize this? use a map or something...
    this.header = new Header({
      selector: "header",
      state: { username: "...", type: "sessions" }
    })
    this.nav = new Nav({
      selector: "navigation",
      events: {
        logout: {
          onclick: () => {
            this.controller.logout();
          }
        }
      }
    })
  }

  loading(status) {
    if(status)
      this.notifier.notify("loading...")
    else
      this.notifier.close();
    this.table.classList[status ? 'add' : 'remove']("loading");
  }

  updateList(sessions) {
    const that = this;
    while (this.table.hasChildNodes()) {
      this.table.removeChild(this.table.childNodes[0]);
    }

    sessions.forEach(({ startsAt, endsAt, type, id }) => {
      new SessionListItem({
        state: { startsAt, endsAt, type, id },
        isList: true,
        table: this.table,
        events: {
          "container": {
            onclick() {
              if(that.controller.user.type === "USER") {
                that.createBooking.open();
                that.controller.setState({
                  selectedSession: {
                    endsAt,
                    type,
                    id,
                    startsAt,
                  }
                })
              }
            }
          }
        },
        attributes: {
          info: { class: "hidden" }
        }
      });
    });
  }

  updateHeader(username) {
    this.header.set({
      key: "username",
      value: username
    })
  }
}

class WidgetController extends Controller {
  constructor() {
    super({ model: "" });
  }

  async getDashboard(merchant) {
    try {
      if(!merchant) {
        this.view.notify("No merchant ID provided!")
        return;
      }

      this.view.updateHeader(merchant);
      await this.getSessions();
    } catch (error) {
      this.view.notify(error.message);
    }
  }

  async getSessions() {
    const { merchantId: merchant } = this.user;

    this.view.loading(true);
    try {
      const sessions = await apis.sessions.get(merchant);
      this.view.updateList(sessions);
      this.view.loading(false);
    } catch (error) {
      this.view.loading(false);
      this.view.notify(error.message);
    }
  }
}

(function() {
  const view = new WidgetView();
  const controller = new WidgetController();
  view.setController(controller);

  window.onload = function() {
    const _search = window.location.search;

    const { merchant } = parseQuery(_search);
    controller.getSessions(merchant);
  }
})();

