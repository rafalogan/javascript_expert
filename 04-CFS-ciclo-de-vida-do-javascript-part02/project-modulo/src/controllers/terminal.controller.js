import DraftLog from "draftlog";
import readline from "readline";
import chalkTable from "chalk-table";

export default class TerminalController {
	constructor(personService, tableOptions) {
		this.personService = personService;
		this.tableOptions = tableOptions;
		this.print = {}

		this.initializeTerminal();
	}

	initializeTerminal() {
		DraftLog(console).addLineListener(process.stdin);
		this.terminal = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		this.print = this.initializeTable();
	}

	initializeTable() {
		const data = this.personService.read();
		const table = chalkTable(this.tableOptions, data);

		return console.draft(table);
	}

	async updateTable(item) {
		const updatedTable = await this.personService.update(item);
		return  this.print(chalkTable(this.tableOptions, updatedTable));

	}

	question(msg = '') {
		return new Promise(resolve => this.terminal.question(msg, resolve));

	}

	closeTerminal() {
		this.terminal.close()
		console.log('Process finished!');
	}
}
