const express = require('express');
const app = express();
const PORT = 3001;

app.get('/orders', (req, res) => {
  res.json([
    { id: 1, item: 'Laptop', userId: 1 },
    { id: 2, item: 'Mouse', userId: 1 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Order-Service listening on port ${PORT}`);
});