#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

const hero = ({name, age, power}) => ({name, age, power, id: Date.now()});
const { argv } = yargs(hideBin(process.argv))
	.command('createHero', 'Create  a hero', (builder) => builder
		.option('name', {
			alias: 'n',
			demandOption: true,
			describe: 'hero name',
			type: 'string'
		})
		.option('age', {
			alias: 'a',
			demandOption: true,
			describe: 'hero age',
			type: 'number'
		})
		.option('power', {
			alias: 'p',
			demandOption: true,
			describe: 'hero power',
			type: 'string'
		})
		.example('createHero --name Wolverine --age 270 --power  cure', 'Create a hero')
		.example('createHero -n Wolverine -a 270 -p  cure', 'Create a hero'))
	.epilog('copyright 2021 - Rafael Bernardo Candeira');


console.log(hero(argv));
