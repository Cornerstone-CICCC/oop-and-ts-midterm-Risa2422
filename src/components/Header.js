import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement("header");
    header.innerHTML = `
      <nav>
        <logo>Shop</logo>
        <ul class=menu-list>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    `;
    return header;
  }
}
