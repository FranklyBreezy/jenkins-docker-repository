const express = require('express');
const app = express();
const PORT = 3000;

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Aakash Singh' },
    { id: 2, name: 'User Two' }
  ]);
});

app.listen(PORT, () => {
  console.log(`User-Service listening on port ${PORT}`);
});