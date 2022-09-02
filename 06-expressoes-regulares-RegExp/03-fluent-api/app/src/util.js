const safeRegex = require('safe-regex');

class IvalidRegexError extends Error {
	constructor(exp) {
		super(`This ${exp} is unsafe dude!`);
		this.name = 'IvalidRegexError'
	}
}

const evaluateRegex = (exp) => {
	if (safeRegex(exp)) return exp;

	throw new IvalidRegexError(exp);
}

module.exports = {evaluateRegex, IvalidRegexError};
