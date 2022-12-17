import Component from "./component";

const template = `
  <div data-createsession>
    <select data-type>
      <option value="">--------</option>
      <option value="WeekDay">weekday</option>
      <option value="WeekEnd">weekend</option>
    </select>
    <input data-start type="time" name="appt" required>

    select interval
    <select data-interval>
      <option value="">--------</option>
      <option value="45">45</option>
      <option value="60">60</option>
      <option value="90">90</option>
    </select>
    <button data-submit>submit</button>

    <div>
      <div data-detailsdate></div>
      <div data-detailsinterval></div>
    </div>
  </div>
`;


export default class CreateSession extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  show() {
    this._node.classList.add("active");
  }

  hide() {
    this._node.classList.remove("active");
  }
}

