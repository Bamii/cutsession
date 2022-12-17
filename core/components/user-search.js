import Component from "./component";

const template = `
  <div data-search>
    <input data-citysearch type="text" placeholder="Enter a city" />
    <input data-namesearch type="text" placeholder="Enter a name" />
    <button data-searchbtn>search</button>
  </div>
`;


export default class UserSearch extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  clear() {}
}

