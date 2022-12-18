import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import BookingListItem from "../../components/booking-list-item";
import BookingSearch from "../../components/booking-search";
import Header from "../../components/header";
import Nav from "../../components/nav";

class BookingView extends View {
  constructor() {
    super();
    this.selectedBooking = null;
    this.table = document.querySelector("[data-table]");
    this.header = new Header({
      selector: "header",
      state: { username: "...", type: "bookings" }
    })
    this.search = new BookingSearch({
      selector: "search",
      events: {
        start: {
          onchange: (e, component) => {
            component.set({
              key: "end",
              attribute: true,
              attributename: "min",
              value: e.target.value
            });
          }
        },
        searchbtn: {
          onclick: (e, component) => {
            const payload = {
              city: component.get("searchcity", "value"),
              name: component.get("searchmerchant", "value"),
              start: component.get("start", "value"),
              end: component.get("end", "value")
            }
            this.controller.getBookings(payload);
          }
        }
      }
    });
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

    sessions.forEach(({ startsAt, endsAt, title, notes, date }) => {
      new BookingListItem({
        isList: true,
        table: that.table,
        state: { startsAt, endsAt, title, notes, date },
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

class BookingsController extends Controller {
  constructor() {
    super({ model: "" });
    this.state = { selectedBooking: null }
    this.authenticate();
  }

  async getBookings(options = {}) {
    this.view.loading(true);
    try {
      const payload = Object
        .entries(options)            
        .reduce((acc, [key, val]) => (
          !val ? acc : { ...acc, [key]: val }
        ), {});
      
      if(!payload.start && payload.end)
        throw new Error()

      if(payload.start){
        payload.period = `${payload.start}${payload.end ? `:${payload.end}` : ""}`
      }

      delete payload.start;
      delete payload.end;

      const { data: bookings } = await apis.bookings.get(payload);
      this.view.updateList(bookings);
      this.view.loading(false);
    } catch (error) {
      this.view.loading(false);
      this.view.notify(error.message);
    }
  }

  async getDashboard() {
    const { username } = this.user;
    this.view.updateHeader(username);
    await this.getBookings();
  }
}

(function() {
  const view = new BookingView();
  const controller = new BookingsController();
  view.setController(controller);

  window.onload = function() {
    controller.getDashboard();
  }
})();
