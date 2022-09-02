import http from 'http';

// curl "localhost:3000?salary=30000&discount=15"

const netSalary = ({discount, salary}) => {
	const percent = (discount / 100);
	const cost = salary * percent;

	return salary - cost;
}

http.createServer((req, res) => {
	const url = req.url.replace('/', '');
	const params = new URLSearchParams(url);
	const data = Object.fromEntries(params);
	const result = netSalary(data);

	// debugger;
	res.end(`O Seu salario final é: ${result}`);
}).listen(3000, () => console.log('app running at: http://localhost:3000'));
