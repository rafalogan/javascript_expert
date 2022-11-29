import { log } from 'console';
import { createServer } from 'http';

import BusinessError from './errors/businessError.js';
import { statusCodes } from './util/httpStatusCodes.js';

const validateHero = (hero) => {
  // Simulando erro de banco de dados
  // Error generico para trazer outro cenário de erro inesperado.
  if (Reflect.has(hero, 'connectionError')) throw new Error('Error connecting to DB!');


  if (hero.age < 20) throw new BusinessError('Age must be higher then 20!');
  if (hero.name?.length < 4) throw new BusinessError('Name length must be higher then 4!');
}

const handler = async (req, res) => {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);

      validateHero(hero)
      res.writeHead(statusCodes.OK);
    } catch (err) {
      if (err instanceof BusinessError) {
        res.writeHead(statusCodes.BAD_REQUEST);
        res.end(err.message);
        continue
      }

      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
    } finally {
      res.end()
    }
  }
};

createServer(handler).listen(3000, () => log('runnig at 3000'))

// curl -i localhost:3000 -X POST --data '{"name": "Black Panter", "age": 80}'
