import Component from "./component";

const template = `
  <div data-daterange>
    <input data-start type="date" />
    <input data-end type="date" />
    <button data-submit>submit</button>
  </div>
`;


export default class DateRange extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

