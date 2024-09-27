import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleShowCart = this.handleShowCart.bind(this);
  }

  handleShowCart() {
    this.props.cartContext.showCart();
  }

  render() {
    const header = document.createElement("header");
    header.innerHTML = `
      <nav>
        <logo>Shop</logo>
        <ul class=menu-list>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li>
            <button class="btn-show-cart"></button>
          </li>
        </ul>
      </nav>
      <div class="hero"></div>
    `;

    header.querySelector(".btn-show-cart").addEventListener("click", () => {
      const isCartShow = document.querySelector(
        ".container-cart.container-cart-add"
      );
      const wrapperProduct = document.getElementById("wrapper-product");
      const wrapperCarts = document.querySelector(".wrapper-carts");

      if (isCartShow) {
        if (wrapperCarts) {
          wrapperCarts.classList.remove("showCart");
        }
        setTimeout(() => {
          document
            .querySelector(".container-cart")
            .classList.remove("container-cart-add");
        }, 1000);
        wrapperProduct.style.flex = "0 0 100%";
      } else {
        document
          .querySelector(".container-cart")
          .classList.add("container-cart-add");
        wrapperProduct.style.flex = "0 0 70%";
      }
      if (wrapperCarts) {
        wrapperCarts.classList.add("showCart");
      }
      this.handleShowCart();
    });

    return header;
  }
}
