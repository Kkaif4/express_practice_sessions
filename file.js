import fs, { stat } from 'fs';
import status from 'express-status-monitor';
import express from 'express';

const app = express();

app.use(status());
fs.stat('./hello.txt', (err, stats) => {
  console.log(stats);
});

app.get('/', (req, res) => {
  // const stream = fs.createReadStream('./hello.txt', 'utf-8');
  // stream.on('data', (chunk) => res.write(chunk));
  fs.readFile('./hello.txt', (err, data) => {
    res.end(data);
  });
});

app.listen(5000, () => {
  console.log('server is running');
});
