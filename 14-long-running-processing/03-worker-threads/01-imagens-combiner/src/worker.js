import { log } from 'console';
import { parentPort, threadId } from 'worker_threads';
import sharp from 'sharp';
import axios from 'axios';

const downloadFile = async (url) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  return response.data;
}

const onMessage = async ({ image, background }) => {
  const firstLayer = await sharp( await downloadFile(image)).toBuffer();
  const secondLayer = await sharp(await downloadFile(background))
    .composite([
      {input: firstLayer, gravity: sharp.gravity.south},
      {input: firstLayer, gravity: sharp.gravity.north},
      {input: firstLayer, gravity: sharp.gravity.east},
      {input: firstLayer, gravity: sharp.gravity.west},

    ]).toBuffer();

  parentPort.postMessage(secondLayer.toString('base64'));
};

parentPort.on('message', onMessage);
