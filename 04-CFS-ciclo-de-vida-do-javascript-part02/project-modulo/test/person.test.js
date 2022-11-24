import mocha from 'mocha';
import chai from 'chai';

import Person from "../src/entities/person.js";

const {describe, it} = mocha;
const {expect} = chai;

describe('Person', () => {
	it('Should return a person instance from a string', async () => {
		const person  = Person.genaeratInstanceFromString('1 Bike,Carro 20000 2000-01-01 2002-02-01');
		const expected = {
			id: '1',
			vehicles: ['Bike', 'Carro'],
			kmTraveled: '20000',
			from: '2000-01-01',
			to: '2002-02-01'
		}

		expect(person).to.be.deep.equal(expected);
	});

	it('should format values', async () => {
		const person = new Person({
			id: '1',
			vehicles: ['Bike', 'Carro'],
			kmTraveled: '20000',
			from: '2000-01-01',
			to: '2002-02-01'
		})
		const result = person.formatted('pt-BR');
		const expected = {
			id: 1,
			vehicles: 'Bike e Carro',
			kmTraveled: '20.000 km',
			from: '01 de janeiro de 2000',
			to: '01 de fevereiro de 2002'
		}

		expect(result).to.be.deep.equal(expected);
	});

})
