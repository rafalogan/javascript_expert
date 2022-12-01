import os from 'os';
import cluster from 'cluster';
import { log } from 'console';

import { initializeServer } from './server.js';

(() => {
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }

  const cpuNumber = os.cpus().length;

  log(`Primary ${process.pid} is running`);
  log(`Forking server for ${cpuNumber} CPU\n`);

  for (let index = 0; index < cpuNumber; index++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
})();
