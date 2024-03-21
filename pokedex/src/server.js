const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

const pokemonData = JSON.parse(fs.readFileSync('./pokemon.json'));

app.get('/pokemon', (req, res) => {
  res.json(pokemonData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});