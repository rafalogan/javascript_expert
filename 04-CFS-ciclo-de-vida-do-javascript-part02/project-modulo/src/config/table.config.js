import chalk from "chalk";

export const tableOptions = {
		leftPad: 2,
		columns: [
			{field: 'id', name: chalk.cyan('ID')},
			{field: 'vehicles', name: chalk.magenta('Vehicles')},
			{field: 'kmTraveled', name: chalk.cyan('Km Traveled')},
			{field: 'from', name: chalk.cyan('From')},
			{field: 'to', name: chalk.cyan('To')},
		]
	};
