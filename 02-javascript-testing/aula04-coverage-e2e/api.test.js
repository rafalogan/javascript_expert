const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');

const app = require('./api');

describe('API Suite test', () => {
	describe('/contact', () => {
		it('should request the contact page', async () => {
			const response = await request(app)
				.get('/contact')
				.expect(200);

			assert.deepStrictEqual(response.text, 'contact us page')
		})
	})

	describe('/hello', () => {
		it('should request an inenxistent route /hi and redirect to /hello,', async () => {
			const response = await request(app)
				.get('/hi')
				.expect(200);

			assert.deepStrictEqual(response.text, 'Hello World!')
		});
	})

	describe('/login', () => {
		it('should login sucessfuly on the login route and HTTP status 200', async () => {
			const response = await request(app)
				.post('/login')
				.send({username: 'root', password: 'root@100'})
				.expect(200);

			assert.deepStrictEqual(response.text, 'Logging has succeeded!')
		});

		it('should unauthorize a requesting it using wrong credentials and return HTTP Status 401', async () => {
			const response = await request(app)
				.post('/login')
				.send({username: 'xuxa', password: 'root@100'})
				.expect(401);

			assert.ok(response.unauthorized);
			assert.deepStrictEqual(response.text, 'Logging failed!')
		});
	})
});
