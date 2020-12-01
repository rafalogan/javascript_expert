import database from './../database.json';
import TerminalController from "./terminalController.js";
import Person from "./person.js";
import {save} from "./repository.js";



const DEFAULT_LANG = 'pt-BR';
// const DEFAULT_LANG = 'es';
// const DEFAULT_LANG = 'en';
// const DEFAULT_LANG = 'rus';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
	try {
		const answer = await terminalController.question();

		if (answer === STOP_TERM) return terminalController.closeTerminal();

		const person = Person.genaeratInstanceFromString(answer);
		terminalController.updateTable(person.formatted(DEFAULT_LANG));

		await save(person);

		return mainLoop();
	} catch (error) {
		console.error('Deu Ruim!', error);
		return mainLoop();
	}
}

await mainLoop();
