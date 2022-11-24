import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import faker from 'faker';

import Order from "../src/entities/order.js";
import OrderBusiness from "../src/business/orderBusiness.js";


describe('Test suite for Template Method design pattern', () => {
	beforeEach(() => jest.resetAllMocks());

	describe('#OrderBusiness', () => {
		test('Execution Order Business without Template Method', () => {
			const order = new Order({
				customerId: faker.datatype.number(1000),
				amount: faker.finance.amount(),
				products: [{description: faker.commerce.productDescription()}]
			});

			const orderBusiness = new OrderBusiness();
			const isValid = orderBusiness._validateRequireFields(order);
			const result = orderBusiness._create(order);

			expect(isValid).toBeTruthy();
			expect(result).toBeTruthy();
		});

		test('Execution Order Business with Template Method', () => {
			const order = new Order({
				customerId: faker.datatype.number(1000),
				amount: faker.finance.amount(),
				products: [{description: faker.commerce.productDescription()}]
			});

			const orderBusiness = new OrderBusiness();
			const callValidationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequireFields.name);
			const callCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name);
			const result = orderBusiness.create(order);

			expect(result).toBeTruthy();
			expect(callValidationFn).toHaveBeenCalled();
			expect(callCreateFn).toHaveBeenCalled();
		});
	});

});
