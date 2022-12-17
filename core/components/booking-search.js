import Component from "./component";

const template = `
  <div data-search>
    <input data-searchcity type="text" placeholder="Enter a city" />
    <input data-searchmerchant type="text" placeholder="Enter a Merchant name/ID" />
    <input data-start type="date" />
    <input data-end type="date" />
    <button data-searchbtn>search</button>
  </div>
`;


export default class BookingSearch extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

