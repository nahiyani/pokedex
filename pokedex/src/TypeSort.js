import React, { useState, useEffect } from 'react';

function TypeSort({ filterPokemon }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      .then(response => response.json())
      .then(data => setTypes(data))
      .catch(error => console.error('Error fetching types:', error));
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    filterPokemon(type, ''); // Pass the selected type and an empty search query to filterPokemon function
  };

  return (
    <div id='typesort-div'>
      <select id='typesort' onChange={handleTypeChange}>
        <option value="">All</option>
        {types.map((type, index) => (
          <option key={index} value={type.english}>
            {`${type.english}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeSort;