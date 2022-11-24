import { Readable, Writable } from 'stream';


// Fonte de dados
const readable = Readable({
	read() {
		this.push('Hello World');
		this.push('Hello World 1');
		this.push('Hello World 2');
		this.push('Hello World 3');
		this.push('Hello World 4');

		this.push(null);
	}
})

// Saida de dados
const writable = Writable({
  write(chunk, enconding, cb) {
		console.log('msg', chunk.toString());
		cb();
	}
});


readable
	.pipe(writable)
	// .pipe(process.stdout);
