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

import express, { response } from 'express';
import fs from 'fs';
import { performance } from 'perf_hooks';
import createLog from './middleware/LogMiddleware.js';

function setLog(log) {
  const writeStream = fs.createWriteStream('./logger.jsonl', { flags: 'a' });
  const success = writeStream.write(JSON.stringify(log) + '\n');
  if (!success) {
    console.warn('Backpressure: Stream buffer full');
  }
}

const app = express();
app.use(createLog);

app.get('/', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const message = { msg: 'Root path visited: Hello im root' };
  const { date, time } = req.timestamp;
  res.json(message);
  res.on('finish', () => {
    const end = performance.now();
    duration = end - start;
  });
  let jsonLog = {
    log: message.msg,
    date,
    time,
    requestTime: duration,
  };
  setLog(jsonLog);
});

app.get('/create/file/Sync/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const fileName = req.params.fileName;
  const { date, time } = req.timestamp;
  const message = {};
  let jsonLog = {};
  try {
    fs.writeFileSync(
      `./New_Files/${fileName}.txt`,
      'I Am new file,created by using Sync function'
    );
    message.msg = `${fileName}.txt file created(Sync)`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  } catch (err) {
    message.msg = 'error creating file (SYNC)';
    res.json(jsonLog);
    res.on('end', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/create/file/Async/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const { date, time } = req.timestamp;
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
          res.on('finish', () => {
            const end = performance.now();
            duration = end - start;
            jsonLog = {
              log: message.msg,
              date,
              time,
              requestTime: `${duration} ms`,
            };
          });
          setLog(jsonLog);
          return res.json(message);
        }
        message.msg = 'file created (Async)';
        res.on('finish', () => {
          const end = performance.now();
          duration = end - start;
        });
        jsonLog = {
          log: message.msg,
          date,
          time,
          requestTime: `${duration} ms`,
        };
        res.json(jsonLog);
        setLog(jsonLog);
      }
    );
  } catch (err) {
    message.msg = 'error creating file (Async)';
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/read/file/Sync/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const { date, time } = req.timestamp;
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    const fileData = fs.readFileSync(`./New_Files/${fileName}.txt`, 'utf-8');
    message.msg = `reading file ${fileName}.txt (Sync) `;

    res.json({ fileData, message });
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  } catch (err) {
    message.msg = 'internal server error in reading file (Sync)';
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/read/file/Async/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const { date, time } = req.timestamp;
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.readFile(`./New_Files/${fileName}.txt`, 'utf-8', (err, data) => {
      if (err) {
        message.msg = `error in reading ${fileName}.txt file (ASYNC)`;
        res.json(message);
        res.on('finish', () => {
          const end = performance.now();
          duration = end - start;
        });
        jsonLog = {
          log: message.msg,
          date,
          time,
          requestTime: `${duration} ms`,
        };
        setLog(jsonLog);
      }
      message.msg = `reading file ${fileName}.txt (ASYNC) `;
      res.json({ data, message });
      res.on('finish', () => {
        const end = performance.now();
        duration = end - start;
      });
      jsonLog = {
        log: message.msg,
        date,
        time,
        requestTime: `${duration} ms`,
      };
      setLog(jsonLog);
    });
  } catch (err) {
    message.msg = `internal server error in reading ${fileName}.txt file (ASYNC)`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/update/file/Sync/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.appendFileSync(`./${fileName}.txt`, 'new data in sync\n');
    const fileData = fs.readFileSync(`./${fileName}.txt`, 'utf-8');
    message.msg = `${fileName}file updated successfully (Sync)`;
    res.json({ message, file: fileData });
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  } catch (err) {
    message.msg = `error in updating file ${fileName}.txt file(Sync)`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/update/file/Async/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const message = {};
  let jsonLog = {};
  const fileName = req.params.fileName;
  try {
    fs.appendFile(`./${fileName}.txt`, 'new data without sync\n', (err) => {
      if (err) {
        message.msg = `error updating file ${fileName}.txt (ASYNC)`;

        res.on('finish', () => {
          const end = performance.now();
          duration = end - start;
        });
        jsonLog = {
          log: message.msg,
          date,
          time,
          requestTime: `${duration} ms`,
        };
        setLog(jsonLog);
        return res.json(message);
      }
    });
    message.msg = `file ${fileName}.txt updated (ASYNC)`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  } catch (err) {
    message.msg = `internal server error in writing file (ASYNC)`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/delete/:fileName', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const message = {};
  let jsonLog = {};
  const { date, time } = req.timestamp;
  const fileName = req.params.fileName;
  try {
    fs.unlinkSync(`./${fileName}.txt`);
    message.msg = `file ${fileName}.txt Deleted`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    log = {
      message: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  } catch (err) {
    message.msg = 'Error deleting File';
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  }
});

app.get('/stream/logs', (req, res) => {
  const start = performance.now();
  let duration = 0;
  const { date, time } = req.timestamp;
  const message = {};
  let jsonLog = {};
  const fileName = 'logger.jsonl';
  const readStream = fs.createReadStream(fileName, 'utf-8');
  readStream.on('open', () => {
    message.msg = 'reading file (Streams)';
    jsonLog = {
      log: message.msg,
      date,
      time,
      responseTime: 'file reading in process...',
    };
    setLog(jsonLog);
  });
  readStream.on('data', (chunk) => res.send(chunk));
  readStream.on('end', () => {
    message.msg = `${fileName}.txt file reading completed`;
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
    res.end();
  });
  readStream.on('error', () => {
    message.msg = `Error in streaming file ${fileName}`;
    res.json(message);
    res.on('finish', () => {
      const end = performance.now();
      duration = end - start;
    });
    jsonLog = {
      log: message.msg,
      date,
      time,
      requestTime: `${duration} ms`,
    };
    setLog(jsonLog);
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'sorry page not found' });
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
