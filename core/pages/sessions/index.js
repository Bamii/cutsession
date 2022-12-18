import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import SessionListItem from "../../components/session-list-item";
import Header from "../../components/header";
import CreateSession from "../../components/create-session";
import CreateBooking from "../../components/create-booking";
import { parseQuery } from "../../../utils";
import Nav from "../../components/nav";
import { getTimeInterval } from "../../../utils";
import CreateSessionModel from "../../schema/create-session";
import CreateBookingModel from "../../schema/create-booking";

class SessionView extends View {
  constructor() {
    super();
    this.table = document.querySelector("[data-table]");
    // probably optimize this? use a map or something...
    this.header = new Header({
      selector: "header",
      state: { username: "...", type: "sessions" }
    })
    this.createSession = new CreateSession({
      selector: "createsession",
      events: {
        type: {
          onchange: (e, component) => {
            const type = component.get("type", "value");
            const start = component.get("start", "value");

            component.set({
              key: "detailsdate",
              value: type
            });

            if(type.toLowerCase() === "weekday") {
              component.set({
                key: "start",
                attributename: "min",
                value: "9:00",
                attribute: true
              })
              component.set({
                key: "start",
                attributename: "max",
                value: "7:15",
                attribute: true
              })
            } else {
              component.set({
                key: "start",
                attributename: "min",
                value: "10:00",
                attribute: true
              })
              component.set({
                key: "start",
                attributename: "max",
                value: "20:30",
                attribute: true
              })
            }
          }
        },
        start: {
          onchange: (e, component) => {
            const start = component.get("start", "value");
            const interval = component.get("interval", "value");

            component.set({
              key: "intervalstart",
              value: `${start}:00Z`
            });
            if(interval) {
              const { hour, minute, suffix } = getTimeInterval(start, interval);
  
              component.set({
                key: "intervalend",
                value: `${hour}:${minute}${suffix}`
              });            
            }
          }
        },
        interval: {
          onchange: (e, component) => {
            const start = component.get("start", "value");
            const interval = component.get("interval", "value");
            if(!start || !interval) return;

            const { hour, minute, suffix } = getTimeInterval(start, interval);
            component.set({
              key: "intervalstart",
              value: `${start}${suffix}`
            });
            component.set({
              key: "intervalend",
              value: `${hour}:${minute}${suffix}`
            });
          }
        },
        submit: {
          onclick: (e, component) => {            
            this.controller.createSession({
              type: component.get("type", "value"),
              interval: component.get("interval", "value"),
              start: component.get("start", "value")
            });
          }
        }
      }
    })
    this.createBooking = new CreateBooking({
      selector: "createbooking",
      events: {
        submit: {
          onclick: (e, component) => {
            const { id, type } = this.controller.state.selectedSession;
            const { userId } = this.controller.user;

            const data = {
              type,
              sessionId: id,
              userId: "fgdfghjhcryuguftvhjjfgdfghjhcryuguftvhjj",
              date: component.get("date", "value"),
              notes: component.get("note", "value"),
              title: component.get("title", "value")
            }

            this.controller.createBooking(data);
          }
        },
        close: {
          onclick: (e, component) => {
            component.close();
          }
        }
      }
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

  init() {
    this.updateNav();
  }
  
  updateNav() {
    const { type } = this.controller.user;
    this.nav.showUserNav(type);
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
          info: {
            class: (classes) => this.controller.user.type === "MERCHANT"
              ? "hidden" : `${classes}`
          }
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

  updateCreateSession(show) {
    this.createSession[show ? "show" : "hide"]();
  }
}

class SessionsController extends Controller {
  constructor() {
    super({ model: "" });
    this.state = { selectedSession: null, merchantId: "", isSelf: false };
    this.authenticate();
  }

  async createBooking({ date, type, ...options }) {
    this.view.loading(true);
    try {
      const maps = {
        "weekend": [0,6],
        "weekday": [1,2,3,4,5]
      }

      // initialise date
      const _date = new Date(date);
      const day = _date.getDay();
      if(!maps[type.toLowerCase()].includes(day)) {
        throw new Error("improper date");
      }

      const payload = {
        ...options,
        date: `${_date.getFullYear()}-${`${_date.getMonth()}`.padStart(2, "0")}-${`${_date.getDay()}`.padStart(2, "0")}`
      }
      
      CreateBookingModel.validate(payload);
      await apis.bookings.create(payload);

      this.view.createBooking.close();
      this.getSessions();
      this.view.notify("Booking created successfully");
    } catch (error) {
      this.view.notify(error.message);
    } finally {
      this.view.loading(false);
    }
  }

  async createSession({ interval, start, ...options }) {
    try {
      if(!interval) {
        this.view.notify("invalid interval")
        return;
      };

      this.view.loading(true);
      const { hour, minute, suffix } = getTimeInterval(start, interval);

      const payload = {
        startsAt: `${start}${suffix}`,
        endsAt: `${hour}:${minute}${suffix}`,
        ...options
      }

      CreateSessionModel.validate(payload);
      await apis.sessions.create(this.state.merchantId, payload);
      this.getSessions();
      this.view.notify("Session created successfully");
    } catch (error) {
      this.view.notify(error.message);
    }
  }

  async getDashboard(merchant) {
    try {
      const { username, type, merchantId } = this.user;
      if(!merchant && type !== "MERCHANT") {
        this.navigate("/bookings.html")
        return;
      }

      this.view.updateHeader(!merchant ? username : merchant);
      if(!merchant && type === "MERCHANT")
        merchant = merchantId;

      const isSelf = !merchant || merchant === merchantId;
      this.setState({ merchantId: merchant, isSelf });
      this.view.updateCreateSession(type === "MERCHANT" && isSelf);
      await this.getSessions(merchant);
    } catch (error) {
      this.view.notify(error.message);
    }
  }

  async getSessions(_merchant) {
    const { merchantId: merchant } = this.user;

    this.view.loading(true);
    try {
      const sessions = await apis.sessions.get(_merchant || merchant);
      this.view.updateList(sessions);
      this.view.loading(false);
    } catch (error) {
      this.view.loading(false);
      this.view.notify(error.message);
    }
  }
}

(function() {
  const view = new SessionView();
  const controller = new SessionsController();
  view.setController(controller);

  window.onload = function() {
    const _search = window.location.search;

    const { merchant } = parseQuery(_search);
    controller.getDashboard(merchant);
  }
})();

