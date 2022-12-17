export default class Controller {
  constructor({ model }) {
    this.model = model;
    this.state = {};
    this.view = null;
    this.merchants = JSON.parse(localStorage.getItem("merchants"));
    this.users = JSON.parse(localStorage.getItem("users"));
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  setState(state) {
    this.state = { ...this.state, ...state }    
  }

  authenticate() {
    const _route = window.location.pathname;
    const rules = [
      { route: "/sessions.html", authenticate: true, allowed: ["USER", "MERCHANT"] },
      { route: "/bookings.html", authenticate: true, allowed: ["USER"] },
      { route: "/users.html", authenticate: true, allowed: ["USER", "MERCHANT"] },
      { route: "/login.html", authenticate: false, allowed: ["USER", "MERCHANT"] },
      { route: "/register-merchant.html", authenticate: false, allowed: ["USER", "MERCHANT"] },
      { route: "/register-user.html", authenticate: false, allowed: ["USER", "MERCHANT"] },
      { route: "/signup.html", authenticate: false, allowed: ["USER", "MERCHANT"] }
    ];
    const route = rules.find(({ route }) => _route == route);
    const { authenticate, allowed } = route;
    
    if(authenticate) {
      if(!this.user)
        this.navigate("/login.html");

      const { type } = this.user;
      if(!allowed.includes(type)) {
        switch (type) {
          case "MERCHANT":
            this.navigate("/sessions.html");
            break;
          
          case "USER":
            this.navigate("/bookings.html");
            break;
        
          default:
            break;
        }
      }
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
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  logout() {
    this.user = null;
    localStorage.clear();
    this.navigate("/login.html");
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
