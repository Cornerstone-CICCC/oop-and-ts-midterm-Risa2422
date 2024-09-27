import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("div");
    footer.innerHTML = `
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>`;
    return footer;
  }
}
