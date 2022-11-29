const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
	{
		const filePath = './mocks/emptyFile-invalid.csv';
		const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
		const result = File.csvToJson(filePath);
		await rejects(result, rejection);
	}
	{
		const filePath = './mocks/fourItems-invalid.csv';
		const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
		const result = File.csvToJson(filePath);
		await rejects(result, rejection);
	}
	{
		const filePath = './mocks/threeItems-valid.csv';
		const result = await File.csvToJson(filePath);
		console.log(result);
		const expected = [
			{
				"id": 123,
				"name": "Rafael Bernardo",
				"profession": "senior developer",
				"birthDay": 1985
			},
			{
				"id": 321,
				"name": "Leticia Boebel",
				"profession": "administractive",
				"birthDay": 1993
			},
			{
				"id": 231,
				"name": "Alexandra",
				"profession": "java developer",
				"birthDay": 1980
			}
		]
		deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
	}
})();
