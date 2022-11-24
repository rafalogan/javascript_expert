import database from './../database.json';
import TerminalController from "./controllers/terminal.controller.js";
import PersonService from "./services/person.service.js";
import {tableOptions} from "./config/table.config.js";


const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const personService = new PersonService(database, DEFAULT_LANG);
const terminalController = new TerminalController(personService, tableOptions);

async function mainLoop() {
	try {
		const answer = await terminalController.question();
		if (answer === STOP_TERM) return terminalController.closeTerminal();

		terminalController.updateTable(answer);

		return mainLoop();
	} catch (error) {
		console.error('Deu Ruim!', error);
		return mainLoop();
	}
}

await mainLoop();
