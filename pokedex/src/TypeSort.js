import React, { useState, useEffect } from 'react';

function TypeSort({ filterPokemonByType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      .then(response => response.json())
      .then(data => setTypes(data))
      .catch(error => console.error('Error fetching types:', error));
  }, []);

  const handleTypeChange = (event) => {
    filterPokemonByType(event.target.value);
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