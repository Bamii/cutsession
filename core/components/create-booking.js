import Component from "./component";

const template = `
  <div class="" data-createbooking>
    <div class="">
      <input data-date type="date" placeholder="enter a date" />
      <input data-title type="text" placeholder="enter a title"></textarea>
      <textarea data-note type="text" placeholder="enter a note"></textarea>
      <button data-submit>submit</button>
    </div>
  </div>
`;


export default class CreateBooking extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  open() {
    this._node.classList.add("active");
  }

  close() {
    this._node.classList.remove("active");
  }
}

