import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
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

  handleAddCart(item) {
    this.props.cartContext.addProduct(item);
  }

  formattedPrice(price) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  getCurrentCount() {
    const currentCount = this.props.cartContext.carts.find(
      (item) => item.id === this.props.item.id
    );
    return currentCount.quantity;
  }

  render() {
    const item = document.createElement("li");
    item.innerHTML = `
  <img src="${this.props.item.image}">
  <p>Price: ${this.formattedPrice(this.props.item.price)}</p>
  <div>
    ${
      this.props.cartContext.carts.some(
        (cartItem) => cartItem.id === this.props.item.id
      )
        ? `<button class="decrease">-</button><span>${this.getCurrentCount()}</span><button class="increase">+</button><span>`
        : `<button class="addToCart">add to cart</button>`
    }
  </div>`;

    const increaseButton = item.querySelector(".increase");
    const decreaseButton = item.querySelector(".decrease");
    const addToCartButton = item.querySelector(".addToCart");

    if (increaseButton) {
      increaseButton.addEventListener("click", () => {
        this.handleIncreaseQuantity(this.props.item.id);
      });
    }

    if (decreaseButton) {
      decreaseButton.addEventListener("click", () => {
        this.handleDecreaseQuantity(this.props.item.id);
      });
    }

    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        this.handleAddCart(this.props.item);
      });
    }
    return item;
  }
}
