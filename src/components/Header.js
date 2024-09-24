import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement("header");
    header.innerHTML = `
      <nav>
        <menu>
          <li><a href="#">Home</a></li>
          <li><a href="cart.html">Cart</a></li>
        </menu>
      </nav>
    `;
    return header;
  }
}
