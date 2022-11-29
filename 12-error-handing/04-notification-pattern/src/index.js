import { log } from 'console';
import { createServer } from 'http';

import HeeroEntity from './heroEntity.js';
import { statusCodes } from './util/httpStatusCodes.js';

const handler = async (req, res) => {
  for await (const data of req) {
    try {
      const parsedData = JSON.parse(data);

      if (Reflect.has(parsedData, 'connectionError')) throw new Error('Error connecting to DB!');

      const hero = new HeeroEntity(parsedData);

      if (!hero.isValid()) {
        res.writeHead(statusCodes.BAD_REQUEST);
        res.end(hero.notifications.join('\n'));
        continue
      }
      res.writeHead(statusCodes.OK);
    } catch (err) {
      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
    } finally {
      res.end()
    }
  }
};

createServer(handler).listen(3000, () => log('runnig at 3000'))

// curl -i localhost:3000 -X POST --data '{"name": "Black Panter", "age": 80}'
