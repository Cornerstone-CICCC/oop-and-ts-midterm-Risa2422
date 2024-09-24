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
    const cart = this.props.cartContext.carts;
    const target = cart.find((item) => {
      return item.id === id;
    });

    if (target.quantity === 1) {
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
    const productTitle = this.props.cartContext.products.find(
      (item) => item.id === this.props.item.id
    );
    return productTitle.title;
  }

  render() {
    const todoElement = document.createElement("li");
    todoElement.innerHTML = `
      <p>Title:${this.getProductTitle()}</p>  
      <button class="decrease">-</button><span>${this.getCurrentCount()}</span><button class="increase">+</button>
      <button class='btn-delete'>Delete</button>`;

    todoElement
      .querySelector(".btn-delete")
      .addEventListener("click", () =>
        this.handleDeleteCart(this.props.item.id)
      );

    todoElement.querySelector(".increase").addEventListener("click", () => {
      this.handleIncreaseQuantity(this.props.item.id);
    });

    todoElement.querySelector(".decrease").addEventListener("click", () => {
      this.handleDecreaseQuantity(this.props.item.id);
    });

    return todoElement;
  }
}
