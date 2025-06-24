import express from 'express';
import {
  validationBody,
  validationParams,
  validationQuery,
} from './middleware/validation.js';

const app = express();

//middleware for using json data
app.use(express.json());

app.use(express.static('public'));

//? request line: http://localhost:3000/:user
// request line: query, params
// header :
// request body : raw, text, json, csv, from

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/user', validationQuery, (req, res) => {
  const { name, city, age } = req.query;
  res.json({ message: 'success', name, age, city });
});

app.get('/:name/:age/:city', validationParams, (req, res) => {
  const { name, age, city } = req.params;
  res.json({ message: 'success', name, age, city });
});

app.post('/new', (req, res) => {
  const { name, age, city } = req.body;
  res.status(200).json({ message: 'success', name, age, city });
});

const Name = [
  { name: 'john', age: 21 },
  { name: 'kaif', age: 32 },
];

// put, patch, delete
app.put('/update', validationBody, (req, res) => {
  const { user, age } = req.body;
  Name.name = user;
  Name.age = age;
  res.json(Name);
});

app.patch('/update/name', (req, res) => {
  const { user } = req.body;
  Name.name = user;
  res.json(Name);
});

app.delete('/:user/delete', (req, res, next) => {
  const user = req.params.user;
  const found = Name.reduce((acu, c) => {
    if (c.name === user) {
      acu = Name.indexOf(user);
    }
    return acu;
  }, 0);
  if (found) {
    Name.splice(found, 1);
    return res.json(Name);
  }
  res.json({ message: 'user not found' });
});

app.use((err, req, res, next) => {
  console.error('error handler:', err.message); // you can log this to a file too
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Something went wrong',
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'sorry page not found' });
});

app.listen(3000, () => {
  console.log(`server is running fine on port 3000`);
});

// basic server
// init -y
// express installation
// package-lock json
// .env
// .gitignore
// req query, params, body
// CRUD operations
