const {expect} = require('chai');
const {it, describe} = require('mocha');
const {productValidator} = require('./../src');

const ProductMotherObject = require("./model/ProductMotherObject");

describe('Test Mother Object', () => {
	it('shouldn\'t return error with valid product', () => {
		const product = ProductMotherObject.valid();
		const result = productValidator(product);
		const expected = {
			errors: [],
			result: true
		}

		expect(result).to.be.deep.equal(expected);
	});

	describe('Product Validation Rules', () => {
		it('should return an object error when creating a Product with invalid id', () => {
			const product = ProductMotherObject.withInvalidId();
			const result = productValidator(product);
			const expected = {
				errors: [
					"id: invalid length, current [1] expected to between 2 and 20"
				],
				result: false
			}

			expect(result).to.be.deep.equal(expected);
		});
		it('should return an object error when creating a Product with invalid name', () => {
			const product = ProductMotherObject.withInvalidName();
			const result = productValidator(product);
			const expected = {
				errors: [
					"name: invalid value, current [abc.1243] expected to have only words"
				],
				result: false
			}

			expect(result).to.be.deep.equal(expected);
		});
		it('should return an object error when creating a Product with invalid price', () => {
			const product = ProductMotherObject.withInvalidPrice();
			const result = productValidator(product);
			const expected = {
				errors: [
					"price: invalid value, current [2000] expected to between 1 and 1000"
				],
				result: false
			}

			expect(result).to.be.deep.equal(expected);
		});
		it('should return an object error when creating a Product with invalid category', () => {
			const product = ProductMotherObject.withInvalidCategory();
			const result = productValidator(product);
			const expected = {
				errors: [
					"category: invalid value. current [mechanic] expected to be either electronic or organic"
				],
				result: false
			}

			expect(result).to.be.deep.equal(expected);
		});
	});
})
