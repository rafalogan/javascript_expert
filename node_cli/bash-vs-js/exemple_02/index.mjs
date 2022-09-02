$.verbose = false;

import { setTimeout } from 'timers/promises';
import isSafe from 'safe-regex';

await $`docker run -p "8080:80" -d nginx`;
await setTimeout(500);

const req = await $`curl --silent localhost:8080`;
console.log('request \n', req.stdout);

const containers = await $`docker ps`;
const exp = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(exp)) throw new Error('unsafe regex!!');

const { groups: { containerId } } = containers.toLocaleString().match(exp);
console.log('containerId: ', containerId);

const logs = await $`docker logs ${containerId}`;
console.log('logs \n', logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log('rm -f \n', rm.stdout);
