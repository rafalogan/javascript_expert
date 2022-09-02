const { describe, it } = require('mocha');
const {expect} = require('chai');

const Person = require('../src/person');

describe('Person', () => {
	it('should generate a person from instance list', () => {
		const content = [
				'Xuxa da Silva',
				'brasileira',
				'casada',
				'CPF 235.743.420-12',
				'residente e domiciliada a Rua dos bobos',
				'zero',
				'bairro Alphaville',
				'São Paulo.'
			];

		const result = new Person(content)
		const expected = {
			name: 'Xuxa da Silva',
			nationality:'Brasileira',
			civilStatus: 'Casada',
			document: '23574342012',
			street: 'Rua dos bobos',
			number: 'zero',
			district: 'Alphaville',
			state: 'São Paulo'
		}

		expect(result).to.be.deep.equal(expected);
	});
});
