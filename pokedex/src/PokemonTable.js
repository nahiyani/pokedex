import React, { useState } from 'react';

const PokemonTable = ({ pokemonData }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (attr) => {
    if (sortBy === attr) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(attr);
      setSortOrder('asc');
    }
  };

  const sortedPokemon = sortBy
    ? pokemonData.slice().sort((a, b) => {
        const valA = a.base[sortBy];
        const valB = b.base[sortBy];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      })
    : pokemonData;

  return (
    <div>
      {pokemonData ? (
        <table className="pokemon-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>#</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('type')}>Type</th>
              <th onClick={() => handleSort('HP')}>HP</th>
              <th onClick={() => handleSort('Attack')}>Attack</th>
              <th onClick={() => handleSort('Defense')}>Defense</th>
              <th onClick={() => handleSort('Sp. Attack')}>Sp. Atk</th>
              <th onClick={() => handleSort('Sp. Defense')}>Sp. Def</th>
              <th onClick={() => handleSort('Speed')}>Speed</th>
            </tr>
          </thead>
          <tbody>
            {sortedPokemon.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.name.english}</td>
                <td>{pokemon.type.join(', ')}</td>
                <td>{pokemon.base.HP}</td>
                <td>{pokemon.base.Attack}</td>
                <td>{pokemon.base.Defense}</td>
                <td>{pokemon.base["Sp. Attack"]}</td>
                <td>{pokemon.base["Sp. Defense"]}</td>
                <td>{pokemon.base.Speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading Pokémon data...</p>
      )}
    </div>
  );
};

export default PokemonTable;
