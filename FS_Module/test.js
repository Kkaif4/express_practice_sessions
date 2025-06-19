import express from 'express';
import status from 'express-status-monitor';
const app = express();

// streams --> 400mb --> read
// variable --> server 400mb

app.use(status());

app.get('/one', (req, res) => {
  res.send(`hello I'm root route`);
});



app.listen(3000, () => {
  console.log('server is running fine');
});
