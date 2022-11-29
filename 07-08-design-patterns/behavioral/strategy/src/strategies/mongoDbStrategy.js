import MongoDB from 'mongodb';

export default class MongoDbStrategy {

	#instance

	constructor(connectionString) {
		const {pathname: dbName } = new URL(connectionString);

		this.connectionString = connectionString.replace(dbName, '');
		this.db = dbName.replace(/\W/g, '');
		this.collection = 'warriors'
	}

	async connect() {
		const client = new MongoDB.MongoClient(this.connectionString, {
			useUnifiedTopology: true
		});

		await client.connect();
		this.#instance = client.db(this.db).collection(this.collection);
	}

	async create(item) {
		return this.#instance.insertOne(item);
	}

	async read(item) {
		return this.#instance.find(item)
			.toArray();
	}
}
