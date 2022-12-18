import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import UserListItem from "../../components/user-list-item";
import UserSearch from "../../components/user-search";
import Nav from "../../components/nav";

class UserView extends View {
  constructor() {
    super();
    this.table = document.querySelector("[data-table]");
    this.search = new UserSearch({
      selector: "search",
      events: {
        searchbtn: {
          onclick: (e, component) => {
            const payload = Object.entries({
              city: component.get("citysearch", "value"),
              name: component.get("namesearch", "value")
            }).reduce((acc, [key, val]) => (
              !val ? acc : { ...acc, [key]: val }
            ), {});

            this.controller.getMerchants(payload);
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

  updateList(users) {
    while (this.table.hasChildNodes()) {
      this.table.removeChild(this.table.childNodes[0]);
    }

    users.forEach(({ phoneNumber, name, email, id, merchantId }) => {
      const that = this;
      new UserListItem({
        isList: true,
        table: this.table,
        state: {
          id, name, email,
          "phonenumber":phoneNumber,
        },
        events: {
          "container": {
            onclick() {
              that.controller
                .navigate(`/sessions.html?merchant=${merchantId}`)
            }
          }
        }
      });
    });
  }
}

class UsersController extends Controller {
  constructor() {
    super({ model: "" });
    this.authenticate();
  }
  
  async getMerchants(opts) {
    this.view.loading(true);
    try {
      const { data: merchants } = await apis.users.get_merchants(opts);
      this.view.updateList(merchants);
      this.view.loading(false);
    } catch (error) {
      this.view.loading(false);
      this.view.notify(error.message);
    }
  }

  async getDashboard() {
    try {
      await this.getMerchants();
    } catch (error) {
      this.view.notify(error.message);
    } finally {
      this.view.loading(false);
    }
  }
  
  async getUsers() {
    this.view.loading(true);
    try {
      const { data: merchants } = await apis.users.get_users();
      this.view.updateList(merchants);
    } catch (error) {
      this.view.notify(error.message);
    } finally {
      this.view.loading(false);
    }
  }
}

(function() {
  const view = new UserView();
  const controller = new UsersController();
  view.setController(controller);

  window.onload = () => {
    controller.getMerchants();
  }
})();
