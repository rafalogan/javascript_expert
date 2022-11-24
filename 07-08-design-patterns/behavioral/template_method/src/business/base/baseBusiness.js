import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
	_validateRequireFields(data) {
		throw new NotImplementedException(this._validateRequireFields.name)
	}

	_create(data) {
		throw new NotImplementedException(this._create.name)
	}

	create(data) {
		const isValid = this._validateRequireFields(data);
		if (!isValid) throw new Error(`invalid data: ${data}!`);

		return this._create(data);
	}
}
