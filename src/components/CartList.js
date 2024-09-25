import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { carts: [] };
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);
    this.todoListElement = null;
    this.totalData = null;
    this.cartImage = null;
  }

  updateCart() {
    this.todoListElement.innerHTML = "";
    this.cartImage.classList.add("remove");

    this.state.carts = this.props.cartContext.carts;

    if (this.state.carts.length === 0) {
      this.totalData.innerHTML = "";
      this.cartImage.classList.remove("remove");
      return;
    }

    this.state.carts.forEach((item) => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext,
      });

      this.todoListElement.appendChild(cartItem.render());
    });

    this.totalData.innerHTML = `
      <p class="total-price"><span>Total ( <span>${this.getTotalCount()} )</span></span>
      <span>${this.getTotalPrice()}</span></p>
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
    let total = 0;
    this.props.cartContext.carts.forEach((item) => {
      total += item.quantity;
    });

    return total;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.props.cartContext.carts.forEach((item) => {
      const price = this.props.cartContext.products.find(
        (item2) => item2.id === item.id
      );

      if (price) {
        totalPrice += price.price * item.quantity;
      }
    });

    return this.formattedPrice(totalPrice);
  }

  formattedPrice(price) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  render() {
    const todoListElement = document.createElement("div");
    todoListElement.className = "cart";
    todoListElement.innerHTML = `
      <h2>Order Summary</h2>
      <div class="cart-image">
        <img src="../images/empty-cart.svg"></img>
        <p>Your added items will be appear here.</p>
      </div>
      <ul id='cart'></ul>
      <div class="total"></div>`;
    this.todoListElement = todoListElement.querySelector("ul");
    this.totalData = todoListElement.querySelector(".total");
    this.cartImage = todoListElement.querySelector(".cart-image");

    return todoListElement;
  }
}
