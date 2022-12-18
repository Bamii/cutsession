import Component from "./component";

const template = `
  <div class="cursor-pointer p-3 mt-10 my-3 border-l hover:border-black border-white" data-container>
    <div class="text-3xl font-bold pb" data-title></div>
    <div class="">
      <span class="text-xs font-semibold">date:</span>
      <div class="text-sm" data-date></div>
    </div>  
    <div class="flex mt-2">
      <div class="mr-10">
        <span class="text-xs font-semibold">starts at:</span>
        <div class="text-sm" data-startsAt></div>
      </div>  
      <div class="">
        <span class="text-xs font-semibold">ends at:</span>
        <div class="text-sm" data-endsAt></div>
      </div>  
    </div>
    <div class="mt-3">
      <label class="font-semibold text-xs">notes:</label/>
      <div class="text-sm" data-notes></div>
    </div>
  </div>
`;


export default class BookingListItem extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

