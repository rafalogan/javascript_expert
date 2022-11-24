export default class ContextStrategy {
	constructor(dbStrategy) {
		this.dbStraregy = dbStrategy;
	}

	async connect() {
		return this.dbStraregy.connect();
	}

	async create(item) {
		return this.dbStraregy.create(item);
	}

	async read(item) {
		return this.dbStraregy.read(item);
	}


}
