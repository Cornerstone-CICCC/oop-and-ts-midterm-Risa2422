import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { carts: [] };
    this.todoListElement = null;
    this.handleDeleteCart = this.handleDeleteCart.bind(this);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
  }

  handleIncreaseQuantity(id) {
    this.props.cartContext.increaseQuantity(id);
  }

  handleDecreaseQuantity(id) {
    this.state.carts = this.props.cartContext.carts;
    const selectedItem = this.state.carts.find((CartItem) => {
      return CartItem.id === id;
    });

    if (selectedItem.quantity === 1) {
      this.props.cartContext.removeProduct(id);
    } else {
      this.props.cartContext.decreaseQuantity(id);
    }
  }

  handleDeleteCart(id) {
    this.props.cartContext.removeProduct(id);
  }

  getCurrentCount() {
    const currentCount = this.props.cartContext.carts.find(
      (item) => item.id === this.props.item.id
    );
    return currentCount.quantity;
  }

  getProductTitle() {
    const itemTitle = this.props.cartContext.products.find(
      (item) => item.id === this.props.item.id
    );
    return itemTitle.title;
  }

  formattedPrice(price) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  getEachTotal() {
    const eachPrice = this.props.cartContext.products.find(
      (item) => item.id === this.props.item.id
    );

    const eachQuantity = this.props.cartContext.carts.find(
      (item) => item.id === this.props.item.id
    );

    const totalPrice = eachPrice.price * eachQuantity.quantity;
    return this.formattedPrice(totalPrice);
  }

  render() {
    const cartItem = document.createElement("li");
    cartItem.className = "cart-product";
    cartItem.innerHTML = `
      <p class="cart-item-title">${this.getProductTitle()}</p>
      <div class="cart-modify">
        <p>$${this.getEachTotal()}</p>
        <div class="cart-button-list">
          <div class="cart-buttons">
            <button class="cart-decrease">-</button>
            <span>${this.getCurrentCount()}</span>
            <button class="cart-increase">+</button>
          </div>
            <button class="btn-remove"></button>
        </div>
      </div>`;

    cartItem
      .querySelector(".btn-remove")
      .addEventListener("click", () =>
        this.handleDeleteCart(this.props.item.id)
      );

    cartItem.querySelector(".cart-increase").addEventListener("click", () => {
      this.handleIncreaseQuantity(this.props.item.id);
    });

    cartItem.querySelector(".cart-decrease").addEventListener("click", () => {
      this.handleDecreaseQuantity(this.props.item.id);
    });

    return cartItem;
  }
}
