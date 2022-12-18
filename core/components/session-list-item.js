import Component from "./component";

const template = `
  <div class="cursor-pointer p-3 mt-10 my-3 border-l hover:border-black border-white" data-container>
    <div class="text-2xl font-bold pb" data-type></div>
    <div class="flex items-center pb-2">
      <div data-startsAt></div>
      <div class="mx-3">to</div>
      <div data-endsAt></div>
    </div>
    <div data-info class="text-sm text-gray-500 ">
      (click to create booking)
    </div>
  </div>
`;


export default class SessionListItem extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

