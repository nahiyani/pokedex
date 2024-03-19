import React, { useState, useEffect } from 'react';

function Search({ pokemonData, setSelectedPokemon }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    if (!pokemonData) return;
    setFilteredPokemon(pokemonData);
  }, [pokemonData]);

  const handleSearch = event => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = pokemonData.filter(pokemon => pokemon.name.english.toLowerCase().includes(query));
    setFilteredPokemon(filtered);
    setSelectedPokemon(filtered[0]);
  };

  return (
    <div id='search'>
      <input
        type="text"
        id="searchbar"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div>
        {filteredPokemon.map(pokemon => (
          <div key={pokemon.id}>
            {pokemon.name.english}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
