const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
	constructor({cars}) {
		this.carRepository = new BaseRepository({file: cars})

	}

	getRandomPositionFromArray(list) {
		const listLength = list.length;

		return Math.floor(Math.random() * (listLength))
	}


	choseRandomCar(carCategory) {
		const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);

		return carCategory.carIds[randomCarIndex];
	}

	async getAvailableCar(carCategory) {
		const carId = this.choseRandomCar(carCategory);
		return  await this.carRepository.find(carId);

	}
}

module.exports = CarService;
