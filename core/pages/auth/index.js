(function() {
  const controller = new AuthController();


})();

import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";

class AuthView extends View {
  constructor() {
    super();
  }

  updateList() {

  }

  showCreatedBooking() {

  }
}

class AuthController extends Controller {
  constructor() {
    super({ model: "", view: new AuthView() });
    this.submit_button = document.getElementById("submit");
    this.email = document.querySelector('data-email');
    this.dob = document.querySelector('data-dob');
    this.name = document.querySelector('data-name')
    this.cityOfResidence = document.querySelector("data-cityOfResidence")
    this.username = document.querySelector('data-username');
    this.password = document.querySelector('data-password');
    this.phoneNumber = document.querySelector('data-phoneNumber')
  }

  init() {}

  async login(type) { // type = USER | MERCHANT 
    const login = await apis.auth.login({
      username: this.username,
      password: this.password
    });
    this.updateUser({ ...login, type });
    switch (type) {
      case "USER":
        this.view.navigate("/bookings.html");
        break;

      case "MERCHANT":
        this.view.navigate("/sessions.html");
        break;
    
      default:
        break;
    }
  }

  async signup() {
    const bookings = await apis.auth.signup({
      username: this.username,
      password: this.password,
      phoneNumber: this.phoneNumber,
    });
    if(bookings.userId) {
      this.updateUser({ ... bookings, type: "USER" });
      this.view.navigate("/bookings");
    }
    if(bookings.merchantId) {
      this.updateUser({ ... bookings, type: "MERCHANT" });
      this.view.navigate("/bookings");
    }
  }
}
