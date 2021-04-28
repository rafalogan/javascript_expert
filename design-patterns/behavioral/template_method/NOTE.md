# Template Method



```js
export default class BaseBusiness {
	create(data) {
	    // Validate Fields
			// Save on Database
	}

	_validateRequireFields(data) {
	    
	}

	_create(data) {
	    
	}
}
```

Pattern of Martin Fowler ths propose of pattern is ensure a flow of methods, defining a sequence
to execute.
The ```create()``` method is the implementation effective of Template Method 

```js
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
```
All developers must remember to strictly follow this execution flow
If you forget to call validation method, you can break the entire system


With the Template Method, the sequence of steps is always performed
prevents replication logic
