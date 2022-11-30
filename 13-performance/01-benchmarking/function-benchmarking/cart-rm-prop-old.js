import Product from "../src/entities/product.js";

export default class Cart {
  constructor({ art, products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter(product => !!Reflect.ownKeys(product).length)
      .map((item) => new Product(item));

    return JSON.parse(JSON.stringify(productsEntities));
  }
}
