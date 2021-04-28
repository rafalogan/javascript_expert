import Http from "http";

async function InjectHttpInterceptor() {
	const oldEmit = Http.Server.prototype.emit;

	Http.Server.prototype.emit = function(...args) {
		const [type, req, response] = args;

		if (type === 'request') response.setHeader('X-Instumented-By', 'RafaDW - Rafael');
		return oldEmit.apply(this, args);
	}
}

export { InjectHttpInterceptor };
