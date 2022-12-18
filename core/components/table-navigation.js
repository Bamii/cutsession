import Component from "./component";

const template = `
  <div class="mx-auto px-5 flex items-center" data-tablenavigation>
    <div data-previous class="cursor-pointer mr-20 py-2 px-6"> < previous </div>
    <div data-page></div>
    <div data-next class="cursor-pointer ml-20 py-2 px-6"> next > </div>
  </div>
`;


export default class TableNavigation extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  disable(button) {
    this._node.querySelector(`[data-${button}]`).classList.add("cursor-blocked" , "text-gray-400")
  }

  enable(button) {
    this._node.querySelector(`[data-${button}]`).classList.remove("cursor-blocked" , "text-gray-400")
  }

  page(value) {
    this.set({ key: "page", value });
  }
}

