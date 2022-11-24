import { Duplex, Transform } from 'stream'

let count = 0;
const server = new Duplex({
	objectMode: true,
	encoding: 'utf8',
	read(chunk) {
		const everySecond = (intervalContext) => {
			if (count++ <= 5 ) {
				this.push(`My name is Rafael[${count}]`);
				return;
			}

			clearInterval(intervalContext);
			this.push(null);
		}

		setInterval( function () {everySecond(this)})
  },
  write(chunk, encoding, callback) {
		console.log('[writable] saving', chunk)

		callback();
  },
  destroy: function () {}
})


// provar que são canais diferentes!
server.write('[duplex] hey this is a writable!\n');

//on data ->  loga o que rolou no .push do readable;
// server.on('data', msg => console.log(`[readable]: ${msg}`))

server.push(`[duplex]  hey this is a readable!\n`);

const trasnformToUpperCase = Transform({
	objectMode: true,
	transform(chunk, enc, fn) {

		fn(null, chunk.toUpperCase());
	}
})

trasnformToUpperCase.write('[Trasnform] hello from write!');
// o push vai ignorar o que tem na função transform
trasnformToUpperCase.push('[Trasnform] hello from push!\n');
// server.pipe(process.stdout)

server
	.pipe(trasnformToUpperCase)
	.pipe(server);
