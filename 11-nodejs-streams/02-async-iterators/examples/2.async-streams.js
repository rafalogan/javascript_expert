import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

async function * myCustomReadable() {
	yield Buffer.from('this is my');
	await setTimeout(100);
	yield Buffer.from('custom readable')
}

async function * myCustomTransfom(stream) {
	for await(const chunk of stream) {
		yield chunk.toString().replace(/\s/g, '_')
	}
}

async function * myCustomDuplex(stream) {
	let bytesRead = 0;
	const wholeString = [];

	for await(const chunk of stream) {
		console.log('[duplex - writable]', chunk.toString());
		bytesRead += chunk.length
		wholeString.push(chunk);
	}

	yield `wholeString ${wholeString.join()}`;
	yield `bytesRead ${bytesRead}`
}

async function * myCustomWritable(stream) {
	for await(const chunk of stream) {
		console.log('[writable]', chunk.toString());
	}
}

try {
	const controller = new AbortController()

	// caso precise canceler fluxo
	setImmediate(() => controller.abort() )
	await pipeline(
		myCustomReadable,
		myCustomTransfom,
		myCustomDuplex,
		myCustomWritable,
		{ signal: controller.signal }
	)
} catch (err) {
	console.error('ERROR', err.message);
}
console.log('process has finished!');
