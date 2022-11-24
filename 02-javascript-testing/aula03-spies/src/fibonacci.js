class Fibonacci {
	*execute(input, current = 0, next = 1) {
		console.count('execute!')
		if (input === 0) return 0;

		/* Retotna o valor */
		yield current;
		/* Delega a função, mas não retorna valor*/
		yield* this.execute(input -1, next, current + next);
	}
}

module.exports = Fibonacci
