import http from 'http';
import { Readable } from 'stream';

const api1 = (req, res) => {
	let count = 0;
	const readable = Readable({
		read() {
			const everySecond = (intervalContext) => {
				if (count++ <= 5) {
					return this.push(`My name is Rafa[${count}]`)
				}
				clearInterval(intervalContext)
				this.push(null);
			};

			setInterval(function () {everySecond(this)});
		}
	})
};
const api2 = (req, res) => {};

http.createServer(api1).listen(3000, () => console.log('server running at 3000'))
http.createServer(api2).listen(4000, () => console.log('server running at 3000'))
