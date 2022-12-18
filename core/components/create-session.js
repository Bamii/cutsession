import Component from "./component";

const template = `
  <div class="flex" data-createsession>
    <div class="mx-auto p-5 border my-10">
      <div class="text-lg font-bold mb-3">
        create session
      </div>
      <div class="grid gap-3 grid-cols-2 items-end md:flex md:items-end">
        <div class="grid gap-2 mr-2 w-full">
          <label class="text-xs font-bold">day type</label>
          <select class="py-2 px-6 border text-gray-400" data-type>
            <option value="">--------</option>
            <option value="WeekDay">weekday</option>
            <option value="WeekEnd">weekend</option>
          </select>
        </div>

        <div class="grid gap-2 mr-2 w-full">
          <label class="text-xs font-bold">select start time</label>
          <input class="py-2 px-6 border text-gray-400" data-start type="time" name="appt" required>
        </div>

        <div class="grid gap-2 mr-2 w-full">
          <label class="text-xs font-bold">select interval</label>
          <select class="py-2 px-6 border text-gray-400" data-interval>
            <option value="">--------</option>
            <option value="45">45</option>
            <option value="60">60</option>
            <option value="90">90</option>
          </select>
        </div>

        <button class="mx-w-max px-5 py-2 border border-black bg-black text-white hover:bg-white hover:text-black w-full" data-submit>submit</button>
      </div>

      <div class="mt-5">
        <div class="font-bold text-xs">details</div>
        <div class="text-xl" data-detailsdate>----</div>
        <div class="flex items-center">
          <div class="text-lg" data-intervalstart>---</div>
          <span class="mx-2">to</span>
          <div class="text-lg" data-intervalend>---</div>
        </div>
      </div>
    </div>
  </div>
`;


export default class CreateSession extends Component {
  constructor(props) {
    super({ template, ...props });
  }

  show() {
    this._node.classList.add("active");
  }

  hide() {
    this._node.classList.remove("active");
  }

  setDetailsDate(type) {
    this.set({
      key: "detailsdate",
      value: type
    });
  }

  setStartRange(type) {
    if(type.toLowerCase() === "weekday") {
      this.set({
        key: "start",
        attributename: "min",
        value: "9:00",
        attribute: true
      })
      this.set({
        key: "start",
        attributename: "max",
        value: "7:15",
        attribute: true
      })
    } else {
      this.set({
        key: "start",
        attributename: "min",
        value: "10:00",
        attribute: true
      })
      this.set({
        key: "start",
        attributename: "max",
        value: "20:30",
        attribute: true
      })
    }
  }

  setStartIntervalDetails(value) {
    this.set({
      value,
      key: "intervalstart",
    });
  }

  setEndIntervalDetails(value) {
    this.set({
      key: "intervalend",
      value
    });         
  }
}

