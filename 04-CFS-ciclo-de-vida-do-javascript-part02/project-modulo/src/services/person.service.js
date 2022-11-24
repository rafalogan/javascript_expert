import Person from "../entities/person.js";
import {save} from "../repositories/person.repository.js";

export default class PersonService {
	constructor(database, language) {
		this.database = database;
		this.language = language;
	}

	async create(data) {
		try	{
			const save = await save(data);

			if (save) return console.log(`item: ${item} salvo com sucesso!`);
		} catch (err) {
			return err;
		}
	}

	read() {
		return this.database.map(data => new Person(data).formatted(this.language));
	}

	async update(data) {
		const id = Person.setId(this.database);
		const item = Person.genaeratInstanceFromString(data, id);
		const person = new Person(item);
		const save = await this.create(person);

		console.log('istance', item);
		console.log(person);


		this.database.push(item);

		console.log('database', this.database);

		if (save) return this.read();

		return save;
	}

}
