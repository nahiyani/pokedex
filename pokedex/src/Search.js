import React, { useState } from 'react';

function Search({ filterPokemon, setSearchQuery }) {
  const [searchQuery, setSearchQueryLocal] = useState('');

  const handleSearch = event => {
    const query = event.target.value;
    setSearchQueryLocal(query);
    setSearchQuery(query);
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