/*
 * Build a small Express.js app using the Node.js fs module to manage user files.
 * Create a file named after the user (e.g., username.txt) with default content.
 * Add a routes to read file content and return it to the browser, to update the file by appending new content., to delete the file.
 * Use both synchronous and asynchronous fs methods in your app.
 * Send file content using Express response (res.send) in route.
 * And push it to GitHub
 */

import express from 'express';
import fs from 'fs';
// import fs from 'fs';

const app = express();

app.get('/', (req, res) => {
  res.send(`hello I'm root route`);
});

app.get('/create/file/ws/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  fs.writeFileSync(
    `./${fileName}.txt`,
    'I Am new file,created by using Sync function'
  );
  res.json({ message: 'file created successfully' });
});

app.get('/create/file/wts/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  fs.writeFile(
    `./${fileName}.txt`,
    'I Am new file created without using Sync function',
    (err) => {
      if (err)
        return res.json({ message: 'internal server error in reading file' });
    }
  );
  console.log('file created');
  res.send('file created');
});

app.get('/read/file/ws/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  try {
    const fileData = fs.readFileSync(`./${fileName}.txt`, 'utf-8');
    res.send(fileData);
  } catch (err) {
    res.json({ message: 'internal server error in reading file' });
  }
});

app.get('/read/file/wts/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  try {
    fs.readFile(`./${fileName}.txt`, 'utf-8', (err, data) => {
      res.send(data);
    });
  } catch (err) {
    res.json({ message: 'internal server error in reading file' });
  }
});

app.get('/write/file/ws/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  try {
    fs.appendFileSync(`./${fileName}.txt`, 'new data in sync\n');
    try {
      const fileData = fs.readFileSync(`./${fileName}.txt`, 'utf-8');
      res.json({ message: 'file updated successfully', file: fileData });
    } catch (err) {
      res.json({ message: 'internal server error in reading file' });
    }
  } catch (err) {
    res.json({ message: 'internal server error in writing file' });
  }
});

app.get('/write/file/wts/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  try {
    fs.appendFile(`./${fileName}.txt`, 'new data without sync\n', (err) => {
      if (err)
        return res.json({ message: 'internal server error in reading file' });
    });
  } catch (err) {
    res.json({ message: 'internal server error in writing file' });
  }
});

app.get('/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  try {
    fs.unlinkSync(`./${fileName}.txt`);
    res.json({ message: 'file deleted successfully' });
  } catch (err) {
    res.json({ message: 'error deleting file' });
    throw new Error(`error deleting file`);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'sorry page not found' });
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
