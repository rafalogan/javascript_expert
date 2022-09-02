/*
* O objetivo do Fluent API é executar tarefas
* como um pipeline, step by step
* e no fim, chama o build, MUITO similar ao padrão Bulilder
* a diferença que é sobre processos, o Builder sobre contrução
* de objetos
* */

class TextProcessorFluentAPI {

	// propriedade privada
	#content

	constructor(content) {
		this.#content = content;
	}

	extractPeopleData() {
		/*
		* ?<= extrair dados que virão depois desse grupo
		* [contratante|contratada] ou um ou outro, (com a flag i no fim da expessão para pegar minuculo ou maiúsculo)
		* :\s{1} procura literalmente o que tem o seguindo os dois pontos e um espaço
		* tudo entre parenteses para como um gupo "estrair desse gupo para frente"
		*
		* (?!\s) negative look araound, ingnora reptições da espreção que sege por mais de um espaço em branco
		* .*\n extrai tudo até a quebra de linha \n
		* .*? pega tudo até a quebra de linha e assim evitar entrar em loop
		*
		* $ informa que a pesquisa chegou ao fim
		* g -> global
		* m -> multiline
		* i -> case insensitve
		* */

		const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi;

		// faz o match para encontrar a string inteira que contem os dados que precisamos
		this.#content = this.#content.match(matchPerson);
		// console.log('onlyPerson', matchPerson.test(this.#content))
		return this;
	}

	build() {
		return this.#content;
	}
}

module.exports = TextProcessorFluentAPI;
