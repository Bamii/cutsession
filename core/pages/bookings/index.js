import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import BookingListItem from "../../components/booking-list-item";

class BookingView extends View {
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

    sessions.forEach(({ startsAt, endsAt, title, notes, date }) => {
      const el = new BookingListItem({
        state: { startsAt, endsAt, title, notes, date },
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

  showCreatedBooking(booking) {

  }
}

class BookingsController extends Controller {
  constructor() {
    super({ model: "" });
    this.authenticate();
  }

  async createBooking(options) {
    this.view.loading(true);
    try {
      const booking = await apis.bookings.create(options);
      this.view.notify("Booking created successfully");
      this.view.showCreatedBooking(booking);
    } catch (error) {
      this.view.notify("error!!");
    } finally {
      this.view.loading(false);
    }
  }

  async getBookings(merchant) {
    this.view.loading(true);
    try {
      const { data: bookings } = await apis.bookings.get(merchant);
      console.log(bookings)
      this.updateMerchant(merchant, bookings);
      this.view.updateList(bookings);
    } catch (error) {
      this.view.notify("error!!");
    } finally {
      this.view.loading(false);
    }
  }
}

(function() {
  const view = new BookingView();
  const controller = new BookingsController();
  view.setController(controller);

  // window.onload = function() {
  //   const _search = window.location.search;
  //   // parse search.
  //   const { merchant } = parseQuery(_search);
  //   controller.getBookings(merchant);
  // }

  const btn = document.getElementById('load');
  btn.onclick = function() {
    controller.getBookings();
  }
})();
