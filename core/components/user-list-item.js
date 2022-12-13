import Component from "./component";

const template = `
  <div class="list-item" data-container>
    <div data-name></div>
    <div data-email></div>
    <div data-phoneNumber></div>
    <div data-id></div>
  </div>
`;


export default class UserListItem extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

