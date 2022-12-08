import { log } from 'console';
import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import sharp from 'sharp';
import { dirname, resolve } from 'path';

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js'

const joinImages = async (images) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== 0) return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`));
      log(`the thread ${worker.threadId} exited!`);
    })
  })
};

const handler = async (req, res) => {
  if (req.url.includes('join-images')) {
    const { query: { background, img } } = parse(req.url, true);
    const imageBase64 = await joinImages({ image: img, background });
    
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    log('query params', { background, img })
    res.end(`<img style="with:100%; height:100%" src="data:image/jpeg;base64,${imageBase64}" />`);

    return;
  }

  return res.end('OK');
};

createServer(handler).listen(3000, () => log('runnig at 3000'))

// https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d827f481-36f9-48bc-ae93-5cf8ab0de027/de66e9t-cf773cf4-ea7c-40f7-998f-92f7cae50091.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4MjdmNDgxLTM2ZjktNDhiYy1hZTkzLTVjZjhhYjBkZTAyN1wvZGU2NmU5dC1jZjc3M2NmNC1lYTdjLTQwZjctOTk4Zi05MmY3Y2FlNTAwOTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.35kT93n8fG51jYX2DltgtrFpT-hHB5MZKpsHG7vf7Xo
// https://www.pngplay.com/wp-content/uploads/12/robocop-transparent-free-png.png
//https://imagensemoldes.com.br/wp-content/uploads/2021/04/Foto-Rick-and-Morty-PNG-1024x796.png

// backgrounds
// https://cdn.fansshare.com/image/zombieapocalypse/zombie-apocalypse-hd-wallpaper-picture-city-1021932819.jpg
// https://i.imgur.com/ZR3ZngO.jpeg



