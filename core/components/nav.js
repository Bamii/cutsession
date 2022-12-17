import Component from "./component";

const template = `
  <div data-navigation>
    <a href="/users.html">Users</a>
    <a href="/bookings.html" data-bookings>Bookings</a>
    <a href="/sessions.html" data-sessions>Sessions</a>
    <div data-logout>logout</div>
  </div>
`;


export default class Nav extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  showUserNav(user) {
    this.set({
      key: "bookings",
      attribute: true,
      attributename: "style",
      value: user=== "USER" ? "display: block;" : "display: none;"
    })
    this.set({
      key: "sessions",
      attribute: true,
      attributename: "style",
      value: user === "USER" ? "display: none;" : "display: block;"
    })
  }
}

