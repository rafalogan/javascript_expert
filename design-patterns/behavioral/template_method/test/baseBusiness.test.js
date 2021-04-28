import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import BaseBusiness from "../src/business/base/baseBusiness.js";
import { NotImplementedException } from "../src/util/exceptions.js";


describe('#BaseBusiness', () => {
	beforeEach(() => jest.resetAllMocks());

	test('Should throw an error when child class dosen\'t implement _validateRequireFields(data)', () => {
		class ConcretClass extends BaseBusiness {}
		const concretClass = new ConcretClass();
		const validateError = new NotImplementedException(concretClass._validateRequireFields.name);

		expect(() => concretClass.create({})).toThrow(validateError);
	});

	test('Should throw an error when _validateRequireFields(data) returns false', () => {
		const VALIDATE_DOESNT_SUCCEEDED = false;

		class ConcretClass extends BaseBusiness {
			_validateRequireFields = jest.fn().mockReturnValue(VALIDATE_DOESNT_SUCCEEDED);
		}
		const concretClass = new ConcretClass();
		const validateError = new Error(`invalid data: ${{}}!`);

		expect(() => concretClass.create({})).toThrow(validateError);
	});

	test('Should throw an error when child class dosen\'t implement _create(data)', () => {
		const VALIDATE_SUCCEEDED = true;

		class ConcretClass extends BaseBusiness {
			_validateRequireFields = jest.fn().mockReturnValue(VALIDATE_SUCCEEDED);
		}
		const concretClass = new ConcretClass();
		const validateError = new NotImplementedException(concretClass._create.name);

		expect(() => concretClass.create({})).toThrow(validateError);
	});

	test('Should call _validateRequireFields(data) and _create(data) on create', () => {
		const VALIDATE_SUCCEEDED = true;
		const CREATE_SUCCEEDED = true;

		class ConcretClass extends BaseBusiness {
			_validateRequireFields = jest.fn().mockReturnValue(VALIDATE_SUCCEEDED);
			_create = jest.fn().mockReturnValue(CREATE_SUCCEEDED);
		}

		const concretClass = new ConcretClass();
		const createFromBaseClass = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name);
		const result = concretClass.create({})

		expect(result).toBeTruthy();
		expect(createFromBaseClass).toHaveBeenCalled();
		expect(concretClass._create).toHaveBeenCalled();
		expect(concretClass._validateRequireFields).toHaveBeenCalled();
	});
})
