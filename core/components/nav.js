import Component from "./component";

const template = `
  <div class="w-screen py-5 flex justify-center items-center" data-navigation>
    <a class="hover:underline m-5" href="/users.html">Users</a>
    <a class="hover:underline m-5" href="/bookings.html" data-bookings>Bookings</a>
    <a class="hover:underline m-5" href="/sessions.html" data-sessions>Sessions</a>
    <div class="hover:underline m-5 cursor-pointer" data-logout>logout</div>
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

