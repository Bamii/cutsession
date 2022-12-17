import Component from "./component";

const template = `
  <div data-header>
    <span data-username></span>'s sessions
  </div>
`;


export default class Header extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

