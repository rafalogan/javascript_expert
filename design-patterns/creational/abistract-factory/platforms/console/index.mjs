import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableConsoleComponent from "./tableConsoleComponent.mjs";

export default class ConsoleFactory extends ViewFactory {
	createTable() {
		return new TableConsoleComponent();
	}
}
