import React, { useState } from 'react';

function Search({ filterPokemon }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = event => {
    const query = event.target.value;
    setSearchQuery(query);
    filterPokemon('', query); // Pass an empty type and the search query to filterPokemon function
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
    </div>
  );
}

export default Search;