const Base = require('./base/base');

class Car extends Base {
 constructor({id, name, reluseYear, available, gasAvailable}) {
	 super({id, name});

	 this.reluseYear = reluseYear;
	 this.available = available;
	 this.gasAvailable = gasAvailable;
 }
}

module.exports = Car
