export default class PaymentSubject {
	#observers = new Set();

	notify(data) {
		this.#observers.forEach(observer => observer.update(data))
	}
	unsubcribe(observable) {
		this.#observers.delete(observable);
	}

	subscribe(observable) {
		this.#observers.add(observable);
	}
}
