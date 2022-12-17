import Component from "./component";

const template = `
  <div data-login>
    <input type="text" name="username" id="" data-username>
    <input type="password" data-password>
    <select data-accesstype>
      <option value="">--------</option>
      <option value="MERCHANT">Merchant</option>
      <option value="USER">User</option>
    </select>
    <button data-submit type="submit" id="submit">submit</button>
  </div>
`;


export default class Login extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

