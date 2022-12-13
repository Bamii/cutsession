import Component from "./component";

const template = `
  <div class="list-item" data-container>
    <div data-title></div>
    <div class="time-range">
      <div data-startsAt></div>
      <div data-endsAt></div>
    </div>
    <div data-notes>
    </div>
    <div data-date></div>
    <div data-idxx></div>
  </div>
`;


export default class BookingListItem extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

