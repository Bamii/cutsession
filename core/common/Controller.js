export default class Controller {
  constructor({ model }) {
    this.model = model;
    this.view = null;
    this.merchants = JSON.parse(localStorage.getItem("merchants"));
    this.users = JSON.parse(localStorage.getItem("users"));
    this.user = null;
  }

  authenticate() {
    const _route = window.location.pathname;
    const rules = [
      { route: "/sessions.html", authenticate: true },
      { route: "/bookings.html", authenticate: true },
      { route: "/users.html", authenticate: true },
      { route: "/login.html", authenticated: false },
      { route: "/register-merchant.html", authenticated: false },
      { route: "/register-user.html", authenticated: false },
      { route: "/signup.html", authenticated: false }
    ];
    const { authenticated } = rules.find(({ route }) => _route == route);

    // 404. but we never really reach here.
    // if(!page)

    if(authenticated) {
      if(!this.user)
        this.navigate("/login.html");
    }
  }

  addView(view) {
    this.view = view;
  }

  navigate(route) {
    window.location = route;
  }

  setUser(user) {
    this.user = user;
  }

  updateUser(user, details) {
    this.users = { ...this.merchants, [user]: details };
    localStorage.setItem("users", JSON.stringify(this.users));
  }  

  updateMerchant(merchant, details) {
    this.merchants = { ...this.merchants, [merchant]: details };
    localStorage.setItem("merchants", JSON.stringify(this.merchants));
  }
  
  updateUsers(users) {
    this.users = users;
    localStorage.setItem("users", JSON.stringify(this.users));
    // this.view.updateList(users);
  }

  updateMerchants(merchants) {
    this.merchants = merchants;
    localStorage.setItem("merchants", JSON.stringify(this.merchants));
    // this.view.updateList(merchants);
  }
}
