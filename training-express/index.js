const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  console.log('req: ', req.body);
  const user = req.body;
  res.status(200).json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});