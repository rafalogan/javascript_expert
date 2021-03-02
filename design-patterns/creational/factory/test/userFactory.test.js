const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

const dbData = require('./mocks/mockDbData.json');


class MockDatabase {
	connect = () => this;
	find = async (query) => dbData;
}

rewiremock(() => require('./../src/util/database')).with(MockDatabase);

;(async () => {
	{
		const expected = dbData.map(item => ({name: item.name.toUpperCase()}));

		rewiremock.enable();
		const UserFactory = require("../src/factory/userFactory");
		const userFactory = await UserFactory.createInstance();
		const result = await userFactory.find({name: '*'});

		deepStrictEqual(result, expected);
		rewiremock.disable();
	}
})()
