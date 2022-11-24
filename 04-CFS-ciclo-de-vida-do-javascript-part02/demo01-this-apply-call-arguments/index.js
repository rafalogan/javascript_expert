'use strict';

const {watch, promises } = require('fs')
class File {
	watch(event, filename) {
		console.log('this', this);
		console.log('arguments', Array.prototype.slice.call(arguments));

		this.showContent(filename);
	}

	async showContent(filename) {
		console.log('content', await promises.readFile(filename).toString());
	}
}

const file = new File();

// watch(__filename, file.watch.bind(file));
file.watch.call({showContent: () => console.log('call: hey sinon!')}, null, __filename);
file.watch.apply({showContent: () => console.log('call: hey sinon!')}, [null, __filename]);
