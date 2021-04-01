# Test data builder and Mother object

## Data model

* ProductId: should be between 2 and 20 characters
* Name: should be only words
* Price: should be from zero to a thousand
* Category: should be eletronic or organic


The default are the correct data or sucasses case ex:
```js
class ProductDataBuilder {
	constructor() {
		this.productData = {
			id: '000001',
			name: 'computer',
			price: 1000,
			category: 'eletronic'
		}
	}
}
```
