export class CartContext {
  constructor() {
    this.products = [];
    this.carts = [];
    this.listeners = [];
  }

  setProduct(data) {
    const product = {
      id: data.id,
      category: data.category,
      description: data.description,
      image: data.image,
      title: data.title,
      price: data.price,
      modal: false,
    };

    this.products.push(product);
  }

  addProduct(product) {
    const itemInfo = {
      id: product.id,
      quantity: 1,
    };

    this.carts.push(itemInfo);
    this.notifyListeners();
  }

  addModalProduct(id) {
    this.products.forEach((item) => {
      if (item.id === id) {
        item.modal = true;
      }
    });

    this.notifyListeners();
  }

  closeModal(id) {
    this.products.forEach((item) => {
      if (item.id === id) {
        item.modal = false;
      }
    });

    this.notifyListeners();
  }

  increaseQuantity(id) {
    this.carts.forEach((item) => {
      item.id === id ? item.quantity++ : item;
    });

    this.notifyListeners();
  }

  decreaseQuantity(id) {
    this.carts.forEach((item) => {
      item.id === id ? item.quantity-- : item;
    });
    this.notifyListeners();
  }

  removeProduct(id) {
    this.carts = this.carts.filter((cart) => cart.id !== id);
    this.notifyListeners();
  }

  orderConfirmed() {
    this.carts = [];
    setTimeout(() => {
      this.notifyListeners();
    }, 1200);
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.carts));
  }
}
