'use strict';
const BaseRepository = require('./../repository/base/baseRepository');
const Tax = require('./../entities/tax');
const Transaction = require('./../entities/transaction');

class CarService {
	constructor({cars}) {
		this.carRepository = new BaseRepository({file: cars})
		this.taxesBasedOnAge = Tax.taxBasedOnAge;
		this. currencyFormat = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'})

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

	calculateFinalPrice(customer, carCategory, numberOfDays) {
		const { age } = customer;
		const price  = carCategory.price;
		const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to);
		const finalPrice = ((tax * price) * (numberOfDays))

		return this.currencyFormat.format(finalPrice);
	}

	async rent(customer, carCategory, numberOfDays) {
		const car = await this.getAvailableCar(carCategory);
		const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays);

		const today = new Date();
		const options = { year: 'numeric', month: 'long', day: 'numeric' }

		today.setDate(today.getDate() + numberOfDays);

		const dueDate = today.toLocaleDateString('pt-br', options)

		return new Transaction({customer, car, dueDate, amount: finalPrice});
	}
}

module.exports = CarService;
