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
    const productData = document.createElement("li");
    productData.className = "product-data";
    productData.innerHTML = `
      <h3 class="product-title">${this.props.item.title}</h3>
      <div class="product-image">
        <img src="${this.props.item.image}" alt="${this.props.item.title}">
      </div>
      <div class="product-price-button">
        <p>${this.formattedPrice(this.props.item.price)}</p>
        ${
          this.props.cartContext.carts.some(
            (cartItem) => cartItem.id === this.props.item.id
          )
            ? `
            <div class="btn-count">
              <button class="btn-decrease">-</button>
              <span class="count">${this.getCurrentCount()}</span>
              <button class="btn-increase">+</button>
            </div>`
            : `
            <button class="btn-add-cart">
              <img src="../images/icon-add-to-cart.svg" alt="Add to cart">
              Add to cart
            </button>`
        }
      </div>
      <div></div>
    `;

    const increaseButton = productData.querySelector(".btn-increase");
    const decreaseButton = productData.querySelector(".btn-decrease");
    const addToCartButton = productData.querySelector(".btn-add-cart");

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
    return productData;
  }
}
