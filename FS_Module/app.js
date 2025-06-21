/*
? assignment two 
 * Build a small Express.js app using the Node.js fs module to manage user files.
 * Create a file named after the user (e.g., username.txt) with default content.
 * Add a routes to read file content and return it to the browser, to update the file by appending new content., to delete the file.
 * Use both synchronous and asynchronous fs methods in your app.
 * Send file content using Express response (res.send) in route.
 * And push it to GitHub
 */

/* 
?used assignment two server for assignment three streaming 
*-task is to create a logger file for server.
*-use server which we created in previous sessions and add error handling to api's.
*-download large txt file from internet and stream that file to server.
*-Add exception handling.
*-append new logs of the server with time stamps in logger file.
*-create logger api which will send logger file to server in response.
*/

import express from 'express';
import fs from 'fs';

const app = express();
const writeStream = fs.createWriteStream('./logger.jsonl', { flags: 'a' });

app.get('/', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  c;
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = { msg: 'Root path visited: Hello im root' };
  let jsonLog = {
    message: message.msg,
    date: `${day}/${month + 1}/${year}`,
    time: `${h}:${m}:${s}`,
  };
  writeStream.write(JSON.stringify(jsonLog) + '\n');
  res.json(message);
});

app.get('/create/file/Sync/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  try {
    fs.writeFileSync(
      `./New_Files/${fileName}.txt`,
      'I Am new file,created by using Sync function'
    );
    message.msg = `${fileName}.txt file created(Sync)`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(jsonLog);
  } catch (err) {
    message.msg = 'error creating file (SYNC)';
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    res.json(jsonLog);
  }
});

app.get('/create/file/Async/:fileName', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const fileName = req.params.fileName;
  const message = {};
  let jsonLog = {};
  try {
    fs.writeFile(
      `./New_Files/${fileName}.txt`,
      'I Am new file created without using Sync function',
      (err) => {
        if (err) {
          message.msg = 'error creating file (Async)';
          jsonLog = {
            message: message.msg,
            date: `${day}/${month + 1}/${year}`,
            time: `${h}:${m}:${s}`,
          };
          const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
          if (!success) {
            console.warn('Backpressure: Stream buffer full');
          }
          return res.json(message);
        }
        message.msg = 'file created (Async)';
        jsonLog = {
          message: message.msg,
          date: `${day}/${month + 1}/${year}`,
          time: `${h}:${m}:${s}`,
        };
        const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
        if (!success) {
          console.warn('Backpressure: Stream buffer full');
        }
        res.json(jsonLog);
      }
    );
  } catch (err) {
    message.msg = 'error creating file (Async)';
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  }
});

app.get('/read/file/Sync/:fileName', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    const fileData = fs.readFileSync(`./New_Files/${fileName}.txt`, 'utf-8');
    message.msg = `reading file ${fileName}.txt (Sync) `;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    res.json({ fileData, message });
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
  } catch (err) {
    message.msg = 'internal server error in reading file (Sync)';
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  }
});

app.get('/read/file/Async/:fileName', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.readFile(`./New_Files/${fileName}.txt`, 'utf-8', (err, data) => {
      if (err) {
        message.msg = `error in reading ${fileName}.txt file (ASYNC)`;
        jsonLog = {
          message: message.msg,
          date: `${day}/${month + 1}/${year}`,
          time: `${h}:${m}:${s}`,
        };
        const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
        if (!success) {
          console.warn('Backpressure: Stream buffer full');
        }
        res.json(message);
      }
      message.msg = `reading file ${fileName}.txt (ASYNC) `;
      jsonLog = {
        message: message.msg,
        date: `${day}/${month + 1}/${year}`,
        time: `${h}:${m}:${s}`,
      };
      res.json({ data, message });
      const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
      if (!success) {
        console.warn('Backpressure: Stream buffer full');
      }
    });
  } catch (err) {
    message.msg = `internal server error in reading ${fileName}.txt file (ASYNC)`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  }
});

app.get('/update/file/Sync/:fileName', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.appendFileSync(`./${fileName}.txt`, 'new data in sync\n');
    const fileData = fs.readFileSync(`./${fileName}.txt`, 'utf-8');
    message.msg = `${fileName}file updated successfully (Sync)`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json({ message, file: fileData });
  } catch (err) {
    message.msg = `error in updating file ${fileName}.txt file(Sync)`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  }
});

app.get('/update/file/Async/:fileName', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.appendFile(`./${fileName}.txt`, 'new data without sync\n', (err) => {
      if (err) {
        message.msg = `error updating file ${fileName}.txt (ASYNC)`;
        jsonLog = {
          message: message.msg,
          date: `${day}/${month + 1}/${year}`,
          time: `${h}:${m}:${s}`,
        };
        const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
        if (!success) {
          console.warn('Backpressure: Stream buffer full');
        }
        return res.json(message);
      }
    });
    message.msg = `file ${fileName}.txt updated (ASYNC)`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  } catch (err) {
    message.msg = `internal server error in writing file (ASYNC)`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  }
});

app.get('/delete/:fileName', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.unlinkSync(`./${fileName}.txt`);
    message.msg = `file ${fileName}.txt Deleted`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  } catch (err) {
    message.msg = 'Error deleting File';
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  }
});

app.get('/stream/logs', (req, res) => {
  const time = Date.now();
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const message = {};
  let jsonLog = {};
  const fileName = 'logger.jsonl';
  const readStream = fs.createReadStream(fileName, 'utf-8');
  readStream.on('open', () => {
    message.msg = 'reading file (Streams)';
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
  });
  readStream.on('data', (chunk) => res.send(chunk));
  readStream.on('end', () => {
    message.msg = `${fileName}.txt file reading completed`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.end();
  });
  readStream.on('error', () => {
    message.msg = `Error in streaming file ${fileName}`;
    jsonLog = {
      message: message.msg,
      date: `${day}/${month + 1}/${year}`,
      time: `${h}:${m}:${s}`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
    res.json(message);
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'sorry page not found' });
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
