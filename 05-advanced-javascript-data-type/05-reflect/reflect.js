'use strict'

const assert = require('assert');

// Garantir semantica e segurança em objetos

// ---- apply
const myObj = {
	add(myValue) {
		return this.arg1 + this.arg2 + myValue;
	}
};

// Function.prototype.apply = () => throw new TypeError('Eita!');
// myObj.add.apply = () => throw new Error('Vixxx');

assert.deepStrictEqual(myObj.add.apply({arg1: 50, arg2: 30}, [100]), 180);

// Um problema que dode acntecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!')}

// Esse aqui pode acontecer!
myObj.add.apply = () => {
	throw new TypeError('Vixxx');
}

assert.throws(() => myObj.add.apply({}, []), { name: 'TypeError', message: 'Vixxx' });

// Usando reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20}, [200]);
assert.deepStrictEqual(result, 260);
// ---- apply

// ---- defineProperty
// Questoes semantic
function MyDate() {

}

// feito pra Kct, tudo é Object, mas Object, mas object adicionando porp para uma funcition?
Object.defineProperty(MyDate, 'withObject', { value:  () => 'Hey there'});

// agora faz mas sentido
Reflect.defineProperty(MyDate, 'withReflection', {value: () => 'Hey dude'});

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')
// ---- defineProperty

// ---- deleteProperty
const withDelete = {user: 'Leticia Boebel'}
// Imperformático, evitar ao maixmo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withRefletion = {user: 'Rafael Candeira'};
Reflect.deleteProperty(withRefletion, 'user');

assert.deepStrictEqual(withRefletion.hasOwnProperty('user'), false);
// ---- deleteProperty

// ---- get
// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['username'], undefined);

// Com reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError);
// ---- get

// ---- has
assert.ok('superman' in { superman: ''});
assert.ok(Reflect.has({batman: ''}, 'batman'))
// ---- has

// ---- ownKeys
const user  = Symbol('user');
const databaseUser = {
	id: 1,
	[Symbol.for('password')]: 123,
	[user]: 'Rafael Candeira'
}

// Com os metodos de object, temos que fazer 2 requisições
const objectKeys = [
	...Object.getOwnPropertyNames(databaseUser),
	...Object.getOwnPropertySymbols(databaseUser),
]

assert.deepStrictEqual(JSON.stringify(objectKeys), JSON.stringify([ 'id', Symbol.for('password'), user]));
// com um Reflecition, só um metodo
assert.deepStrictEqual(JSON.stringify(Reflect.ownKeys(databaseUser)), JSON.stringify([ 'id', Symbol.for('password'),  Symbol('user')]));
