import { MongoClient } from 'mongodb';
import { createServer } from 'http';
import { promisify } from 'util';

async function dbConnect() {
  const client = new MongoClient('mongodb://root:root@localhost:27017?authSource=admin');

  await client.connect();
  console.log('mongodb is connected!');
  const db = client.db('comics')

  return {
    collections: { heroes: db.collection('heroes') },
    client
  }
}

const { collections, client } = await dbConnect();

const handler = async (request, response) => {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      await collections.heroes.insertOne({
        ...hero,
        updateAt: new Date().toISOString()
      });
      const heroes = await collections.heroes.find().toArray();

      response.writeHead(200);
      response.write(JSON.stringify(heroes))
    } catch (err) {
      console.error('A request error has happened', err);
      response.writeHead(500);
      response.write(JSON.stringify({ message: 'internal server error!' }))
    } finally {
      response.end()
    }
  }
}


// curl -i localhost:3000 -X POST --data '{"name": "Iron Man", "age": "40"}'

const server = createServer(handler)
  .listen(3000, () => console.log('runing at http://localhost:3000 and process', process.pid));

const onStop = async (signal) => {
  console.info('signal recived', signal);
  await promisify(server.close.bind(server))();

  console.info('Http server is closed!');

  // close(true) -> força o encerramento
  await client.close();
  console.info('Mongo connection has closed.');

  // zero é tudo certo i é erro!
  process.exit(0)
};

// SIGINT -> Ctrl 
// SIGTERM -> KILL
['SIGINT', 'SIGTERM'].forEach(event => process.on(event, onStop))
