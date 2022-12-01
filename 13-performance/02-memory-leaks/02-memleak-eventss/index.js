import { log } from 'console';
import { createServer } from 'http';
import Events from 'events';
import { randomBytes } from 'crypto';

const myEvents = new Events();

function getBytes() {
  return randomBytes(10000);
}

function onData() {
  const items = [];

  getBytes();
  setInterval(function myInterval() { items.push(Date.now()) })
}


const handler = (req, res) => {
  myEvents.on('data', onData);
  myEvents.emit('data', Date.now());

  res.end('ok');
}
createServer(handler).listen(3000, log('running at 3000'));
