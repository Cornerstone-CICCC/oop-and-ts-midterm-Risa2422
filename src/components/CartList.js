import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { carts: [] };
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);
    this.cartListElement = null;
    this.totalData = null;
  }

  updateCart() {
    this.cartListElement.innerHTML = "";
    this.state.carts = this.props.cartContext.carts;
    if (this.state.carts.length === 0) {
      this.totalData.innerHTML = "";
      return;
    }

    this.state.carts.forEach((item) => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext,
      });

      this.cartListElement.appendChild(cartItem.render());
    });

    this.totalData.innerHTML = `
      <p class="total-price">
        <span>Total ( ${this.getTotalCount()} )</span>
        <span>$${this.getTotalPrice()}</span>
      </p>
      <div>
        <button class='btn-confirm'>Order Confirmed</button>
      </div>`;

    this.totalData
      .querySelector(".btn-confirm")
      .addEventListener("click", () => {
        document.querySelector(".btn-confirm").classList.add("after-confirmed");
        document.querySelector(".btn-confirm").textContent =
          "Your order was confirmed!";
        this.props.cartContext.orderConfirmed();
      });
  }

  getTotalCount() {
    let totalCount = 0;
    this.state.carts.forEach((item) => {
      totalCount += item.quantity;
    });

    return totalCount;
  }

  getTotalPrice() {
    const totalPrice = this.state.carts.reduce((accumulator, cartItem) => {
      const product = this.props.cartContext.products.find(
        (productItem) => productItem.id === cartItem.id
      );

      if (product) {
        return accumulator + product.price * cartItem.quantity;
      }

      return accumulator;
    }, 0);

    return this.formattedPrice(totalPrice);
  }

  formattedPrice(price) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  render() {
    const cartListElement = document.createElement("div");
    cartListElement.className = "order";
    cartListElement.innerHTML = `
      <h2>Order Summary</h2>
      <ul class='cart-list'></ul>
      <div class="total"></div>`;
    this.cartListElement = cartListElement.querySelector("ul");
    this.totalData = cartListElement.querySelector(".total");

    return cartListElement;
  }
}
