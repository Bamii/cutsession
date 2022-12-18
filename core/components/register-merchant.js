import Component from "./component";

const template = `
  <div data-signup>
    <div class="flex flex-col">
      <input class="my-5 py-2 px-6 border text-gray-400" type="text" id="" data-username placeholder="enter your username">
      <input class="my-5 py-2 px-6 border text-gray-400" type="password" data-password placeholder="enter your password">
      <input class="my-5 py-2 px-6 border text-gray-400" type="text" data-name placeholder="enter your name">
      <input class="my-5 py-2 px-6 border text-gray-400" type="phone" data-phone placeholder="enter your phone">
      <input class="my-5 py-2 px-6 border text-gray-400" type="email" id="" data-email placeholder="enter your email">
      <input class="my-5 py-2 px-6 border text-gray-400" type="text" id="" data-cityofoperation placeholder="enter your city of operation">
      
      <button class="px-5 py-2 bg-black text-white border-2 border-white hover:border-black hover:bg-white hover:text-black" data-submit type="submit" id="submit">submit</button>
    </div>
  </div>
`;

export default class RegisterMerchant extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

