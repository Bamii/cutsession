import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import SessionListItem from "../../components/session-list-item";

class SessionView extends View {
  constructor() {
    super();
    this.table = document.querySelector("[data-table]");
  }

  loading(status) {
    this.table.classList[status ? 'add' : 'remove']("loading");
  }

  updateList(sessions) {
    while (this.table.hasChildNodes()) {
      this.table.removeChild(this.table.childNodes[0]);
    }

    sessions.forEach(({ startsAt, endsAt, type, id }) => {
      const el = new SessionListItem({
        state: { startsAt, endsAt, type, id },
        events: {
          "container": {
            onclick() {
              console.log("yayyyy");
            }
          }
        }
      });
      this.table.append(el.node);
    });
  }

  updateHero() {

  }

  showCreatedSession() {

  }
}

class SessionsController extends Controller {
  constructor() {
    super({ model: "" });
    this.authenticate();
  }

  async createSession(options) {
    const sessions = await apis.sessions.create(options);
    this.view.notify("Session created successfully");
    this.view.showCreatedSession(sessions);
  }

  async getSessions(merchant) {
    this.view.loading(true);
    try {
      const sessions = await apis.sessions.get(merchant);
      console.log(sessions)
      this.updateMerchant(merchant, sessions);
      this.view.updateList(sessions);
    } catch (error) {
      this.view.notify("error!!");
    } finally {
      this.view.loading(false);
    }
  }
}

(function() {
  const view = new SessionView();
  const controller = new SessionsController();
  view.setController(controller);

  // window.onload = function() {
  //   const _search = window.location.search;
  //   // parse search.
  //   const { merchant } = parseQuery(_search);
  //   controller.getBookings(merchant);
  // }

  const btn = document.getElementById('load');
  btn.onclick = function() {
    console.log('clikd')
    controller.getSessions();
  }
})();

