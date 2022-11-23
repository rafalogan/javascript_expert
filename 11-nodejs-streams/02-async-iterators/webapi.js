import http from 'http';
import { Readable } from 'stream';

const api1 = (req, res) => {
	let count = 0;
    const maxItens = 99;
	const readable = Readable({
		read() {
			const everySecond = (intervalContext) => {
				if (count++ <= maxItens) {
					return this.push(JSON.stringify({ id: Date.now() + count, name: `Rafa-${count}`}) + '\n')
				}
				clearInterval(intervalContext)
				this.push(null);
			};

			setInterval(function () {everySecond(this)});
		}
	})

    readable.pipe(res)
};

const api2 = (req, res) => {
	let count = 0;
	const maxItens = 99;
	const readable = Readable({
		read() {
			const everySecond = (intervalContext) => {
				if (count++ <= maxItens) {
					return this.push(JSON.stringify({ id: Date.now() + count, name: `Zézin-${count}`}) + '\n')
				}
				clearInterval(intervalContext)
				this.push(null);
			};

			setInterval(function () {everySecond(this)});
		}
	})

	readable.pipe(res)
};

http.createServer(api1).listen(3000, () => console.log('server running at 3000'))
http.createServer(api2).listen(4000, () => console.log('server running at 4000'))
