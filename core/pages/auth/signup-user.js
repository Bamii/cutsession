import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import Signup from "../../components/register-user";
import SignupUserModel from "../../schema/register-user"

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
              dob: component.get("dob", "value"),
              cityOfResidence: component.get("cityofresidence", "value"),
              name: component.get("name", "value"),
              email: component.get("email", "value"),
              phone: component.get("phone", "value"),
              password: component.get("password", "value"),
              accessType: "USER",
            }

            this.controller.signup(payload);
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
  }
}

class AuthController extends Controller {
  constructor() {
    super({ model: "" });
  }

  async signup(payload) {
    this.view.loading(true);
    try {
      // validate inputs
      SignupUserModel.validate(payload);

      const user = await apis.auth.signup(payload);
      this.setUser({ ...user, type: payload.accessType });
      this.view.loading(false);

      if(user.userId) {
        this.updateUser({ ... user, type: "USER" });
        this.navigate("/bookings.html");
      }
    } catch (error) {
      this.view.notify(error.message);
    }
  }
}

(function() {
  const view = new AuthView();
  const controller = new AuthController();
  view.setController(controller);
})();
