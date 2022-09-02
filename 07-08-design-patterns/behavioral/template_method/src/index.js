import faker from 'faker';

import Order from "./entities/order.js";
import OrderBusiness from "./business/orderBusiness.js";

const order = new Order({
	customerId: faker.datatype.number(10000),
	amount: faker.finance.amount(),
	products: [{description: faker.commerce.productDescription()}]
});
const orderBusiness = new OrderBusiness()

console.info('Order', order);
console.info('Order Created', orderBusiness.create(order));
