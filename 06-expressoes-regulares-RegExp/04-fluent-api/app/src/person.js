const {evaluateRegex} = require('./util');

class Person {
	/*
	* (\w+)?\s.*
	* $1,
	* */
	constructor([name, nationality, civilStatus, document, street, number, district, state]) {
		/*
		* (\w+),
		* ths.$1 = $1
		* */
		this.name = name;
		this.nationality = this._formantFirstLetter(nationality);
		this.civilStatus = this._formantFirstLetter(civilStatus);
		//tudo que for digito vira vazio
		this.document = document.replace(evaluateRegex(/\D/g), '');
		/*
		* busca tudo depois do " a " e extrai tudo
		* (?<= faz com que ignore tudo que vem antes do match
		* conhecido como loolbehind
		* */
		this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
		this.number = number;
		// tudo que vier depois do primeiro espaço
		this.district = district.match(evaluateRegex(/(?<=\s).*$/)).join();
		// remove o ponto literal {.} da string
		this.state = state.replace(evaluateRegex(/\.$/), '');
	}

	_formantFirstLetter(prop) {
		/*
		* ^ -> começo da string
		* + -> um ou mais ocorrencias
		* (\w{1}) -> pega só a primeira letra e deixa em um grupo
		* ([a-zA-Z]) -> extrai as letas maiuscualas ou minusculas que seguem
		* g -> todoas as ocorrencias
		* */
		const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
		return prop.replace(firstLetterExp, (fullMatch,group1, group2, index) => `${group1.toUpperCase()}${group2.toLowerCase()}`);

	}
}

module.exports = Person;
