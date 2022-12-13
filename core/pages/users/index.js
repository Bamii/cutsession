import apis from "../../apis";
import Controller from "../../common/Controller";
import View from "../../common/View";
import UserListItem from "../../components/user-list-item";

class UserView extends View {
  constructor() {
    super();
    this.table = document.querySelector("[data-table]");
  }

  loading(status) {
    this.table.classList[status ? 'add' : 'remove']("loading");
  }

  updateList(users) {
    while (this.table.hasChildNodes()) {
      this.table.removeChild(this.table.childNodes[0]);
    }

    users.forEach(({ phoneNumber, name, email, id, merchantId }) => {
      const that = this;
      const el = new UserListItem({
        state: {
          "name": name,
          "email": email,
          "phoneNumber":phoneNumber,
          id:id
        },
        events: {
          "container": {
            onclick() {
              that.controller.navigate(`/sessions.html?merchant=${merchantId}`)
            }
          }
        }
      });
      this.table.append(el.node);
    });
  }
}

class UsersController extends Controller {
  constructor() {
    super({ model: "" });
    this.authenticate();
  }
  
  async getMerchants() {
    this.view.loading(true);
    try {
      const { data: merchants } = await apis.users.get_merchants();
      console.log(merchants);
      // this.updateMerchants(merchants);
      this.view.updateList(merchants);
    } catch (error) {
      this.view.notify("error!!");
    } finally {
      this.view.loading(false);
    }
  }
  
  async getUsers() {
    this.view.loading(true);
    try {
      const { data: merchants } = await apis.users.get_users();
      console.log(merchants);
      // this.updateUsers(merchants);
      this.view.updateList(merchants);
    } catch (error) {
      this.view.notify("error!!");
    } finally {
      this.view.loading(false);
    }
  }

  getNextUsers() {

  }

  getNextMerchants() {

  }
}

(function() {
  const view = new UserView();
  const controller = new UsersController();
  view.setController(controller);

  document
    .querySelectorAll('.tab')
    .forEach((tab) => {
      tab.onclick = function() {
        if(tab.textContent == "users") {
          controller.getUsers();
        } else {
          controller.getMerchants();
        }
      }
    });
})();
