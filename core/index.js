class View {
  constructor() {
    this.controller = null;
  }

  register(controller) {
    this.controller = controller;
  }

  notify() {

  }

  updateBookingList() {

  }

  updateSessionList() {

  }
}

class Controller {
  constructor() {
    this.view = null;
    this.model = null;
    this.merchants = {};
  }
  
  login() {

  }

  signup() {

  }

  getMerchants() {

  }

  getUsers() {

  }

  createBooking() {

  }

  createSession() {

  }

  getBookings() {

  }

  getSessions() {

  }

  updateBookingList() {

  }

  updateSessionList() {

  }
}
