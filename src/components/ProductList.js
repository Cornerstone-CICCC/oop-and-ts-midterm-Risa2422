import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.updateProductList = this.updateProductList.bind(this);
    this.props.cartContext.subscribe(this.updateProductList);
    this.productList = null;
  }

  updateProductList() {
    this.state.products = this.props.cartContext.products;
    this.productList.innerHTML = "";

    this.state.products.forEach((item) => {
      const productItem = new ProductItem({
        item,
        cartContext: this.props.cartContext,
      });

      this.productList.appendChild(productItem.render());
    });
  }

  render() {
    this.state.products = this.props.cartContext.products;
    this.productList = document.createElement("ul");
    this.productList.classList.add("product-list");
    this.state.products.forEach((item) => {
      const productItem = new ProductItem({
        item,
        cartContext: this.props.cartContext,
      });

      this.productList.appendChild(productItem.render());
    });

    return this.productList;
  }
}
