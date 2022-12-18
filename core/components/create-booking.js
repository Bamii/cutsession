import Component from "./component";

const template = `
  <div class="w-full flex" data-createbooking>
    <div class="mx-auto border p-5 w-full md:w-1/3 m-10 grid grid-rows-1 gap-5 flex-col">
      <div class="flex justify-between items-center mb-5">
        <div class="text-2xl">create booking</div>
        <div class="cursor-pointer text-right" data-close>close [x] </div>
      </div>
      <div class="grid gap-2">
        <label class="text-xs font-bold">Pick a session date</label>
        <input class="w-full border border-gray-400 px-3 py-1 text-gray-900" data-date type="date" placeholder="enter a date" />
      </div>
      <div class="grid gap-2">
        <label class="text-xs font-bold">enter a title</label>
        <input class="w-full border border-gray-400 px-3 py-1 text-gray-900" data-title type="text" placeholder="therapy"></textarea>
      </div>
      <div class="grid gap-2">
        <label class="text-xs font-bold">additional notes</label>
        <textarea class="w-full border border-gray-400 px-3 py-1 text-gray-900" data-note type="text" placeholder="scribu cribbum"></textarea>
      </div>
      <button class="mx-w-max px-5 py-2 border border-black bg-black text-white hover:bg-white hover:text-black" data-submit>submit</button>
    </div>
  </div>
`;


export default class CreateBooking extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  open() {
    this._node.classList.add("active");
  }

  close() {
    this._node.classList.remove("active");
  }
}

