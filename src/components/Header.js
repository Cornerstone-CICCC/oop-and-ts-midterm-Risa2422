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
        <logo>LOGO</logo>
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
      const wrapperProduct = document.querySelector(".wrapper-product");
      const wrapperCarts = document.querySelector(".wrapper-carts");

      // hide the order summary section
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
        // show the order summary section
        document
          .querySelector(".container-cart")
          .classList.add("container-cart-add");
        if (wrapperCarts) {
          wrapperCarts.classList.add("showCart");
        }

        wrapperProduct.style.flex = "0 0 70%";
      }
      
      this.handleShowCart();
    });

    return header;
  }
}
