const wtf = [
	{'9999999999999999': 9999999999999999},
	{'true + 2': true + 2},
	{'21 + true': '21' + true},
	{'21 - true': '21' - true},
	{'21 - - 1': '21' - - 1},
	{'0.1 + 0.2 === 0.3': 0.1 + 0.2 === 0.3},
	{'3 > 2 > 1': 3 > 2 > 1},
	{'3 > 2 >= 1': 3 > 2 >= 1},
	{'B + a + + a + a': 'B' + 'a' + + 'a' + 'a'},
	{'"1" == 1': '1' == 1},
	{'"1" === 1': '1' === 1},
];


wtf.forEach(value => console.log('wtf ->', value));


// -------------------------------------

const convertoin = [
	{expilicita: String(123)},
	{inplicita: 123 + ''},
]

convertoin.forEach(item => console.log('convertion', item));

console.assert(String(123) === '123', 'explicit convetion to string');
console.assert(123 +'' === '123', 'implicit convetion to string');
console.assert('hello' || 123 === 'hello', '|| retuns the first element!');
console.assert('hello' && 123 === 123, '&& retuns the last element!');


// ----------------------

const item = {
	name: 'Rafael Bernardo',
	age: 35,
	// string: 1 se não for primitivo, chama o valueOf
	toString() {
		return `Name: ${this.name}, Age: ${this.age}`;
	},
	// number: 1 se não form primitivo, chama o toString
	valueOf () {
		return {hey: 'dude'}
	},
	[Symbol.toPrimitive](coercionType) {
		console.log('trying to convert to', coercionType)
		const types = {
			string: JSON.stringify(this),
			number: '007'
		}

		return types[coercionType] || types.string;
	}
}

//depois de adicionar o toPrimitive
// console.log('toString', String(item));
// console.log('valueOf', Number(item));
// console.log('Date', new Date(item));


// console.assert(item + 0 === '{"name":"Rafael Bernardo","age":35}0');
// console.log('!!item is true?', !!item);
console.log(!!item);

console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"Rafael Bernardo","age":35}');

console.log('implicit + explicit coerction (using ==)', item == String(item));
console.assert(item == String(item));

const item2 = {
	...item,
	name: 'Zézin',
	age: 20
}

console.log('New Object', item2);
console.assert(item2.name === 'Zézin' && item2.age === 20);
