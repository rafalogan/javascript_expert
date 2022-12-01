import { log } from 'console';
import { createServer } from 'http';
import { appendFile } from 'fs/promises';

export function initializeServer() {
  const handler = async (req, res) => {
    await appendFile('./log.txt', `processed by ${process.pid}\n`);

    const result = Array.from({ length: 1e3 }, () => Math.floor(Math.random() * 40))
      .reduce((prev, next) => prev + next, 0);

    res.end(result.toString());
  }

  createServer(handler).listen(3000, () => log(`running at 3000 and pid: ${process.pid}`));

  setTimeout(() => process.exit(1), Math.random() * 1e4);
}
