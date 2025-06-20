//! Streams
import fs, { write } from 'fs';

//? 4gb --> 4g --> server (4gb)
//? 4gb -->  chunk --> server

const readStream = fs.createReadStream('./Data.txt', 'utf-8');
readStream.on('data', (chunk) => console.log(chunk));
readStream.on('end', () => {
  console.log('finished');
});

// append new data to existing file
const writeStream = fs.createWriteStream('./output.txt', { flags: 'a' });

writeStream.write('\nhello im old data');

writeStream.end();

//? pipe
// file --> receive in variable --> new file
// file --> pipe -- > new file
readStream.pipe(writeStream);

// streams
// stream read
// stream write
// append file using streams
// pipe line
