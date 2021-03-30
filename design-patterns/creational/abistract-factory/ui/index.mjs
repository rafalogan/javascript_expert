import { database } from "../shared/data.mjs";
import App from "./app.mjs";


;(async function main() {
	const path = globalThis.window ? 'browser' : 'console';
	const {default: ViewFactory} = await import(`./../platforms/${path}/index.mjs`);
	const app = new App(new ViewFactory())

	app.initialize(database)
})();
