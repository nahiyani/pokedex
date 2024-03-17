const express = require('express');
const app = express();
const pokemonData = require('pokemon.json');

// Define a GET route to retrieve Pokémon data
app.get('/pokemon', (req, res) => {
  res.json(pokemonData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
