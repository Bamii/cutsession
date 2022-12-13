import Component from "./component";

const template = `
  <div class="list-item" data-container>
    <div data-type></div>
    <div class="time-range">
      <div data-startsAt></div>
      <div data-endsAt></div>
    </div>
    <div data-id></div>
  </div>
`;


export default class SessionListItem extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

