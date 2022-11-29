import { Readable, Writable, Transform } from 'stream';
import { createWriteStream  } from 'fs';


// Fonte de dados
const readable = Readable({
	read() {

		for (let index = 0; index < 1e6; index++ ) {
			const person = { id: Date.now() + index, name: `Rafa-${index}`}
			const data = JSON.stringify(person);

			this.push(data);
		}

		this.push(null);
	}
})

// processamento de dados
const mapFields = Transform({
	transform(chunk, enconding, cb) {
		const data = JSON.parse(chunk);
		const result = `${data.id}, ${data.name.toUpperCase()}\n`;
		cb(null, result);
	}
});

const mapHeaders = Transform({
	transform(chunk, encoding, callback) {
		this.counter = this.counter ?? 0;

		if(this.counter) return callback(null, chunk);

		this.counter += 1;
		callback(null, 'id,name\n'.concat(chunk));
	}
});

// Saida de dados
const writable = Writable({
	write(chunk, enconding, cb) {
		console.log('msg', chunk.toString());
		cb();
	}
});


const pipeline =  readable
	.pipe(mapFields)
	.pipe(mapHeaders)
	// .pipe(writable)
  // .pipe(process.stdout);
	.pipe(createWriteStream('my.csv'))


pipeline.on('end', () => console.log('acabou'))
