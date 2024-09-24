import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateProductList = this.updateProductList.bind(this);
    this.props.cartContext.subscribe(this.updateProductList);
    this.todoListElement = null;
  }

  updateProductList() {
    this.todoListElement.innerHTML = "";
    this.props.cartContext.products.forEach((item) => {
      const productItem = new ProductItem({
        item,
        cartContext: this.props.cartContext,
      });
      this.todoListElement.appendChild(productItem.render());
    });
  }

  render() {
    this.todoListElement = document.createElement("ul");
    this.todoListElement.classList.add("ul");

    this.props.cartContext.products.forEach((item) => {
      const productItem = new ProductItem({
        item,
        cartContext: this.props.cartContext,
      });
      this.todoListElement.appendChild(productItem.render());
    });

    return this.todoListElement;
  }
}
