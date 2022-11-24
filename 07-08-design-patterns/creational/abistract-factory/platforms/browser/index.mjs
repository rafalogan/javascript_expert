import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableBrowserComponent from "./tableBrowserComponent.mjs";

export default class BrowserFactory extends ViewFactory {
	createTable() {
		return new TableBrowserComponent()
	}
}
