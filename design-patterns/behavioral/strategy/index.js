import ContextStrategy from "./src/base/contextStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";
import MongoDbStrategy from "./src/strategies/mongoDbStrategy.js";

const postegresConnectionString = 'postgres://root:root@100@localhost:5432/heroes';
const postgresContext = new ContextStrategy(new PostgresStrategy(postegresConnectionString));

const mongoDBConnectionString = 'mongodb://root:root@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(new MongoDbStrategy(mongoDBConnectionString));

await postgresContext.connect();
await mongoDBContext.connect();


const data = [
	{
		name: 'Rafael Candeira',
		type: 'transaction'
	},
	{
		name: 'Letícia Boebel',
		type: 'activityLog'
	}
]

const contextTypes = {
	transaction: postgresContext,
	activityLog: mongoDBContext
}


for (const {type, name} of data ) {
	const context = contextTypes[type];
	await context.create({name: `${name} - ${Date.now()}`});

	console.log(type, context.dbStraregy.constructor.name);
	console.log(await context.read())
}
