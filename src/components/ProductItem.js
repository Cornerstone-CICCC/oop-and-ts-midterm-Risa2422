import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
    this.handleModalAdd = this.handleModalAdd.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleIncreaseQuantity(id) {
    this.props.cartContext.increaseQuantity(id);
  }

  handleDecreaseQuantity(id) {
    const cart = this.props.cartContext.carts;
    const selectedItem = cart.find((item) => {
      return item.id === id;
    });

    if (selectedItem.quantity === 1) {
      this.props.cartContext.removeProduct(id);
    } else {
      this.props.cartContext.decreaseQuantity(id);
    }
  }

  handleAddCart(item) {
    this.props.cartContext.addProduct(item);
  }

  handleModalAdd(id) {
    this.props.cartContext.addModalProduct(id);
  }

  handleModalClose(id) {
    this.props.cartContext.closeModal(id);
  }

  formattedPrice(price) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  getCurrentCount() {
    const currentCount = this.props.cartContext.carts.find(
      (item) => item.id === this.props.item.id
    );

    return currentCount.quantity;
  }

  render() {
    const productList = document.createElement("li");
    productList.className = "product-data";
    productList.innerHTML = `
    <h3 class="product-title">${this.props.item.title}</h3>
    <div class="product-image">
      <a class="btn-modal"><img src="${this.props.item.image}" alt="${
      this.props.item.title
    }">
      </a>
    </div>
    <div class="product-price-button">
      <p>$${this.formattedPrice(this.props.item.price)}</p>
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

            </button>`
      }
    </div>
    <div class="overlay ${this.props.item.modal ? "added" : ""}">
      <div class="modal">
        <div class="modal-wrapper">
          <button class="btn-modal-close"></button>
          <h3>${this.props.item.title}</h3>
          <div class="modal-image"><img src="${
            this.props.item.image
          }" alt="item image" /></div>
          <div class="modal-item-info">
            <p class="modal-item-description">${
              this.props.item.description
            }</p>
              <div class="modal-price-button">
                <div class=modal-detail>
                <p>$${this.formattedPrice(this.props.item.price)}</p>
                ${
                  this.props.cartContext.carts.some(
                    (cartItem) => cartItem.id === this.props.item.id
                  )
                    ? `
                <div class="btn-count btn-modal-count">
                  <button class="btn-decrease">-</button>
                  <span class="count">${this.getCurrentCount()}</span>
                  <button class="btn-increase">+</button>
                </div>`
                    : `
                <button class="btn-add-cart btn-modal-add-cart">
                  <img src="../images/icon-add-to-cart.svg" alt="Add to cart" />
                  </button>`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    const increaseButton = productList.querySelectorAll(".btn-increase");
    const decreaseButton = productList.querySelectorAll(".btn-decrease");
    const addToCartButton = productList.querySelectorAll(".btn-add-cart");
    const showModal = productList.querySelector(".btn-modal");
    const closeModal = productList.querySelector(".btn-modal-close");

    increaseButton.forEach((element) => {
      if (increaseButton) {
        element.addEventListener("click", () => {
          this.handleIncreaseQuantity(this.props.item.id);
        });
      }
    });

    decreaseButton.forEach((element) => {
      if (decreaseButton) {
        element.addEventListener("click", () => {
          this.handleDecreaseQuantity(this.props.item.id);
        });
      }
    });

    addToCartButton.forEach((element) => {
      if (addToCartButton) {
        element.addEventListener("click", () => {
          this.handleAddCart(this.props.item);
        });
      }
    });

    showModal.addEventListener("click", () => {
      productList.querySelector(".overlay").classList.add("added");
      this.handleModalAdd(this.props.item.id);
    });

    closeModal.addEventListener("click", () => {
      productList.querySelector(".overlay").classList.remove("added");
      this.handleModalClose(this.props.item.id);
    });
    
    return productList;
  }
}
