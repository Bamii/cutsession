import Component from "./component";

const template = `
  <div class="cursor-pointer p-3 mt-10 my-3 border-l hover:border-black border-white" data-container>
    <div class="text-2xl data-name></div>
    <div class="text-md" data-email></div>
    <div class="text-md" data-phonenumber></div>
    <div class="text-xs text-gray-200 mt-2" data-id></div>
  </div>
`;


export default class UserListItem extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

