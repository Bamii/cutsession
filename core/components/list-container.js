import Component from "./component";

const template = `
  <div data-title>
    some listItem
  </div>
`;

export default class ListContainer extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  init({ title, link }) {
    this.set({ key: "title", value: title });
    this.set({ key: "href", value: href, attribute: true });
  }
}
