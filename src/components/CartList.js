import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { carts: [] };
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);
    this.todoListElement = null;
  }

  updateCart() {
    this.todoListElement.innerHTML = "";
    this.state.carts = this.props.cartContext.carts;

    this.state.carts.forEach((item) => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext,
      });

      this.todoListElement.appendChild(cartItem.render());
    });

    // get total
    const total = document.createElement("div");
    total.innerHTML = `<p>total:${this.getTotalCount()}</p><p>total Price:${this.getTotalPrice()}</p> 
      <div>
        <button class='btn-confirm'>Order Confirmed</button>
      </div>`;

    total.querySelector(".btn-confirm").addEventListener("click", () => {
      this.props.cartContext.orderConfirmed();
      this.todoListElement.innerHTML = "<ul>Nothing is selected.</ul>";
      return;
    });

    this.todoListElement.appendChild(total);
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
      let price = this.props.cartContext.products.find(
        (item2) => item2.id === item.id
      );

      let quantity = item.quantity;

      totalPrice += price.price * quantity;
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
    todoListElement.innerHTML = `<h2>What's in cart</h2><ul id='cart'>Nothing is selected.</ul>`;
    this.todoListElement = todoListElement.querySelector("ul");

    return todoListElement;
  }
}
