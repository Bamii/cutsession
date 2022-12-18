import Component from "./component";

const template = `
  <div data-login>
    <div class="flex flex-col">
      <input class="my-5 py-2 px-6 border text-gray-400" type="text" name="username" id="" data-username placeholder="enter your username">
      <input class="my-5 py-2 px-6 border text-gray-400" type="password" data-password placeholder="enter your password">
      <select class="my-5 py-2 px-6 border text-gray-400"  data-accesstype>
        <option value="">--- user type ---</option>
        <option value="MERCHANT">Merchant</option>
        <option value="USER">User</option>
      </select>
      <button class="px-5 py-2 bg-black text-white border-2 border-white hover:border-black hover:bg-white hover:text-black" data-submit type="submit" id="submit">submit</button>
    </div>
  </div>
`;


export default class Login extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

