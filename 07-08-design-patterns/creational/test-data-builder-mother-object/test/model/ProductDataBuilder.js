const Product = require("../../src/entities/product");

class ProductDataBuilder {
	constructor() {
		this.productData = {
			id: '000001',
			name: 'computer',
			price: 1000,
			category: 'electronic'
		}
	}

	static aProduct() {
		return new ProductDataBuilder();
	}

	withInvalidId() {
		this.productData.id = '1';
		return this;
	}

	withInvalidName() {
		this.productData.name = 'abc.1243';
		return this;
	}

	withInvalidPrice() {
		this.productData.price = 2000;
		return this;
	}

	withInvalidCategory() {
		this.productData.category = 'mechanic';
		return this;
	}

	build() {
		 // const product = new Product(this.productData);
		 // return product;
		return new Product(this.productData);
	}
}

module.exports = ProductDataBuilder;
