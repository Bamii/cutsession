import Component from "./component";

const template = `
  <div style="min-width: 20rem; border-width: 10px;" class="hidden fixed right-0 top-0 px-10 py-5 bg-white border-2 border-black" data-notification>
    <div class="cursor-pointer text-xs text-right w-full" data-close>close [x]</div>
    <div class="mt-3 text-xl" data-message>asdfaf</div>
  </div>
`;


export default class Notification extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  notify(value) {
    this.set({ key: "message", value })
    this._node.classList.remove("hidden");
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this._node.classList.add("hidden")
  }
}

