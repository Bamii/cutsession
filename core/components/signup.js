import Component from "./component";

const template = `
  <div data-signup>
    <input type="text" id="" data-name>
    <input type="text" id="" data-username>
    <input type="email" id="" data-email>
    <input type="text" id="" data-cityofoperation>
    <input type="phone" id="" data-phonenumber>
    <select data-accesstype>
      <option value="">--------</option>
      <option value="MERCHANT">Merchant</option>
      <option value="USER">User</option>
    </select>
    <input type="password" data-password>
    <button data-submit type="submit" id="submit">submit</button>
  </div>
`;


export default class Signup extends Component {
  constructor(props) {
    super({ template, ...props });
  }
}

