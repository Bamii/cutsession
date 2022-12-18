import Component from "./component";

const template = `
  <div class="md:items-end my-10 flex flex-col md:flex-row gap-1" data-search>
    <div class="grid grid-rows-1 gap-2">
      <label class="text-sm font-semibold">search by city</label>
      <input class="w-full border border-gray-400 px-5 py-1 text-gray-900" data-searchcity type="text" placeholder="Enter a city" />
    </div>
    <div class="grid grid-rows-1 gap-2">
      <label class="text-sm font-semibold">search by merchant</label>
      <input class="w-full border border-gray-400 px-5 py-1 text-gray-900" data-searchmerchant type="text" placeholder="Enter a Merchant name/ID" />
    </div>
    <div class="grid grid-rows-1 gap-2">
      <label class="text-sm font-semibold">period</label>
      <div class="flex items-center">
        <input class="w-full border border-gray-400 p-1 text-gray-900" data-start type="date" />
        <span class="mx-2">to</span>
        <input class="w-full border border-gray-400 p-1 text-gray-900" data-end type="date" />
      </div>
    </div>
    <button class="mt-5 px-5 py-2 border border-black bg-black text-white hover:bg-white hover:text-black" data-searchbtn>search</button>
  </div>
`;


export default class BookingSearch extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  setMinimumEndDate(value) {
    this.set({
      value,
      key: "end",
      attribute: true,
      attributename: "min",
    });
  }
}

