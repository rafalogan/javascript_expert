import database from './../database.json';
import TerminalController from "./terminalController.js";
import Person from "./person.js";

const DEFAULT_LANG = 'pt-br';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
	try {
		const answer = await terminalController.question();

		if (answer === STOP_TERM) return terminalController.closeTerminal();

		const person = Person.genaeratInstanceFromString(answer);
		console.log('person', person.formatted(DEFAULT_LANG));
		return mainLoop();
	} catch (error) {
		console.error('Deu Ruim!', error);
		return mainLoop();
	}
}

await mainLoop();
