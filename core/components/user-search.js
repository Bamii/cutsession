import Component from "./component";

const template = `
  <div class="justify-items-start my-10 grid grid-rows-1 md:grid-cols-3 gap-5" data-search>
    <input class="w-full border border-gray-400 px-5 py-1 text-gray-900" data-citysearch type="text" placeholder="Enter a city" />
    <input class="w-full border border-gray-400 px-5 py-1 text-gray-900" data-namesearch type="text" placeholder="Enter a name" />
    <button class="px-5 py-2 border border-black bg-black text-white hover:bg-white hover:text-black" data-searchbtn>search</button>
  </div>
`;


export default class UserSearch extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  clear() {}
}

