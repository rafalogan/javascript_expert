const assert = require('assert');

const myMap = new Map();

// Podem ter qualquer coisa como chave
myMap.set(1, 'one')
	.set('Rafael', {text: 'two'})
	.set(true, () => 'Hello Map');


// Usando um construtor
const myMapWhithConstructor = new Map([
	['1', 'str1'],
	[1, 'num1'],
	[true, 'bool1']
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Rafael'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'Hello Map');


// Em Objeto as chaves só podem ser string ou symbol (number é corrigido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, {name: 'Rafael Candeira'})

assert.deepStrictEqual(myMap.get({ id: 1 }),  undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks),  { name: 'Rafael Candeira' });


// Utilitários
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// Para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = Correção implicita para boolean e retorna false
// O jeito certo em Object é ({name: 'Rafael'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// Para remover um item do objeto
// delete item.id
// imperformatico para o JavaScript
assert.ok(myMap.delete(onlyReferenceWorks));

// Não da para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Rafael",{"text":"two"}],[true, () => {}]]));

// for (const item of myMap) console.log(item);

// Objetc é inseguro, pois dependendo do nome da chave, pode subistituir algum comportamento padrão
// ({}).toString() => '[object, Object]'
// ({toString: () => 'Hey'}).toString()

// Qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constutctor, toStrig , valueOf e etc.

const autor = {
	name: 'Laura Bernard',
	toString: 'Quem: Lura Bernard'
}

// Não tem resticão de nome de chave
myMap.set(autor);

assert.ok(myMap.has(autor))
assert.throws(() => myMap.get(autor).toString, TypeError)

// Não da para limpar sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], [])


// --- WeakMap

/* Pode ser coletado após peder as referencias
* usado em casos beeem especificos
* */

/*
* tem a maiora dos beneficios do Map
* Mas: não é iterável
* So chaves de referencias que voce ja conheça
* mais leve e preve leak de memória, porque depois que as instancias saem da memora
* tudo é limpo
* */

const weackMap = new WeakMap();
const hero = { name: 'IronMan'}

// weackMap.set(hero);
// weackMap.get(hero);
// weackMap.delete(hero);
// weackMap.has(hero);

