import Component from "./component";

const template = `
  <div class="text-2xl" data-header>
    <span class="text-4xl" data-username></span>'s <span data-type></span> list
  </div>
`;


export default class Header extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

