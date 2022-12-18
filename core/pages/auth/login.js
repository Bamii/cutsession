import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import Login from "../../components/login";
import LoginModel from "../../schema/login";

class AuthView extends View {
  constructor() {
    super();
    this.login = new Login({
      selector: "login",
      events: {
        submit: {
          onclick: (e, component) => {
            const payload = {
              username: component.get("username", "value"),
              password: component.get("password", "value"),
              accessType: component.get("accesstype", "value"),
            };

            this.controller.login(payload);
          },
        },
      },
    });
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

  async login(payload) {
    this.view.loading(true);
    try {
      // validate inputs;
      LoginModel.validate(payload);

      const login = await apis.auth.login(payload);
      this.setUser({
        ...login,
        type: payload.accessType,
        username: payload.username,
        merchantId: "c3073b9d-edd0-49f2-a28d-b7ded8ff9a8b",
      });
      this.view.loading(false);
      switch (payload.accessType) {
        case "USER":
          this.navigate("/bookings.html");
          break;

        case "MERCHANT":
          this.navigate("/sessions.html");
          break;

        default:
          break;
      }
    } catch (error) {
      this.view.notify(error.message);
    }
  }
}

(function () {
  const view = new AuthView();
  const controller = new AuthController();
  view.setController(controller);
})();
