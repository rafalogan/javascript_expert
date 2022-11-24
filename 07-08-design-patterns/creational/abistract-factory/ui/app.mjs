export default class App {
	constructor(factory) {
		this.table = factory.createTable()
	}

	initialize(database) {
		this.table.render(database)
	}
}
