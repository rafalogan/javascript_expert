const { readFile } = require('fs/promises');

const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTION = {
	maxLines: 4,
	fields: ['id','name','profession','age']
}

class File {
	static async csvToJson(fliePath) {
		try {
			const content  = await File.getFlieContent(fliePath);
			const validation = File.isValid(content)

			if (!validation.valid) throw new Error(validation.error);

			return File.parseCSVToJSON(content);
		} catch (err) {
			console.error('Erro csvToJson', err);
		}
	}

	static async getFlieContent(fliePath) {
		try {
			return (await readFile(fliePath)).toString('utf8');
		} catch (err) {
			console.error('Erro getFileContent', err);
		}
	}

	static isValid(csvString, options = DEFAULT_OPTION) {
		const [header, ...fileWithoutHeader] = csvString.split('\n');
		const isHeaderValid = header === options.fields.join(',');
		const isContentLengthAcepted = (fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines);

		if (!isHeaderValid) return {
			error: error.FILE_FIELDS_ERROR_MESSAGE,
			valid: false
		}

		if (!isContentLengthAcepted) return {
			error: error.FILE_LENGTH_ERROR_MESSAGE,
			valid: false
		}

		return {valid: true}
	}

	static parseCSVToJSON(csvString) {
		const lines = csvString.split('\n').filter(line => {
			if (line) return line;
		});
		const firstLine = lines.shift();
		const header = firstLine.split(',');

		return lines.map(line => {
			const columns = line.split(',');
			let user = {};

			for (const index in columns) user[header[index]] = columns[index];

			return new User(user);
		})

	}
}

module.exports = File;
