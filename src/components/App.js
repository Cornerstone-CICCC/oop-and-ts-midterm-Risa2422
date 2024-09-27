import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  async getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    return result;
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        this.state = { ...this.state, data };
        this.state.data.forEach((item) => {
          this.props.cartContext.setProduct(item);
        });
        container.appendChild(this.render());
      })
      .catch((error) => console.error("Error retrieving data:", error));
  }

  render() {
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
    <container>
      <header></header>
      <wrapper id=wrapper>
        <div id="wrapper-product"></div>
        <div class="container-cart">
          <div class="wrapper-carts"></div>
        </div>
      </wrapper>
      <footer></footer>
    </container>`;

    const header = new Header({
      cartContext: this.props.cartContext,
    }).render();

    const productList = new ProductList({
      cartContext: this.props.cartContext,
    }).render();

    const footer = new Footer().render();
    const cartList = new CartList({
      cartContext: this.props.cartContext,
    }).render();

    container.querySelector("header").appendChild(header);
    container.querySelector("#wrapper-product").appendChild(productList);
    container.querySelector(".wrapper-carts").appendChild(cartList);
    container.querySelector("footer").appendChild(footer);
    return container;
  }
}
