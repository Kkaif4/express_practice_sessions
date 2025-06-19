import express from 'express';
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

app.get('/user', (req, res) => {
  const { user, city, age } = req.query;
  console.log(user, age, city);
  res.json({ user, age, city });
});

app.get('/:user/:city', (req, res) => {
  const { user, city } = req.params;
  res.json({ user, city });
});

app.post('/new', (req, res) => {
  const { name, age } = req.body;
  res.status(200).json({ name, age });
});

const Name = [
  { name: 'john', age: 21 },
  { name: 'kaif', age: 32 },
];

// put, patch, delete
app.put('/update', (req, res) => {
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

app.delete('/:user/delete', (req, res) => {
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
  } else {
    return res.json({ message: 'sorry bad request' });
  }
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
