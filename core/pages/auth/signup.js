import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import Signup from "../../components/signup";

class AuthView extends View {
  constructor() {
    super();
    this.signup = new Signup({
      selector: "signup",
      events: {
        submit: {
          onclick: (e, component) => {
            const payload = {
              username: component.get("username", "value"),
              cityOfOperation: component.get("cityofeoperation", "value"),
              name: component.get("name", "value"),
              email: component.get("email", "value"),
              phone: component.get("phone", "value"),
              accessType: component.get("accesstype", "value"),
              password: component.get("password", "value")
            }

            this.controller.signup(payload);
          }
        }
      }
    })
  }
}

class AuthController extends Controller {
  constructor() {
    super({ model: "" });
  }

  async signup(payload) {
    try {
      // validate inputs
      const user = await apis.auth.signup(payload);
      this.setUser({ ...user, type: payload.accessType });
      if(user.userId) {
        this.updateUser({ ... user, type: "USER" });
        this.view.navigate("/bookings");
      }
      if(user.merchantId) {
        this.updateUser({ ... user, type: "MERCHANT" });
        this.view.navigate("/bookings");
      }
    } catch (error) {
      console.log(error)
    }
  }
}

(function() {
  const view = new AuthView();
  const controller = new AuthController();
  view.setController(controller);
})();
