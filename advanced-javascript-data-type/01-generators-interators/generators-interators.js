const assert = require('assert');

function* calculation(arg1, arg2) {
	yield arg1 * arg2;
}


function *main() {
	yield 'Hello';
	yield '-';
	yield 'world';
	yield* calculation(30, 10)
 }

const generator = main();

// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'world', done: false });
assert.deepStrictEqual(generator.next(), { value: 300, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), [ 'Hello', '-', 'world', 300 ]);
assert.deepStrictEqual([...main()], [ 'Hello', '-', 'world', 300 ]);


// --- async interators
const {readFile, stat, readdir} = require('fs/promises');

function* promisified() {
	yield readFile(__filename);
	yield Promise.resolve('Hey Dude');
}

async function* systemInfo() {
	const file = await readFile(__filename);
	yield { file: file.toString()}

	const {size} = await stat(__filename);
	yield {size}

	const dir = await readdir(__dirname);
	yield {dir};
}

// Promise.all([...promisified()])
// 	.then(results => console.log('promisified', results));

;(async () => {
	for await (const item of systemInfo()) console.log('syst', item);
})();
