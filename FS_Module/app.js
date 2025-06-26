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
import router from './routes/filesRoutes.js';
import { setTime } from './middleware/setTime.js';
import { setLog } from './utils/setLog.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(setTime);
app.use(express.json());

app.get('/', (req, res) => {
  const log = 'Root path visited: Hello im root';
  res.json({ message: log, success: true });
  setLog(req, res, log);
});

app.use('/files', router);

app.use(errorHandler);

app.use((req, res) => {
  const log = 'sorry page not found, unlisted api visited ';
  res.status(404).json({ message: log, success: false });
  setLog(req, res, log);
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
