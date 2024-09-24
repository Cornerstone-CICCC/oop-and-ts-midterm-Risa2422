import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("div");
    footer.innerHTML = `<h2>This is a footer</h2>`;
    return footer;
  }
}
